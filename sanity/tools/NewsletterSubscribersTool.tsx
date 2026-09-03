"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Stack,
  Text,
  Button,
  Flex,
  Spinner,
  Badge,
  TextInput,
} from "@sanity/ui";
import { TrashIcon } from "@sanity/icons/Trash";
import { authClient } from "@/lib/auth-client";
import {
  categoryLabels,
  CATEGORY_VALUES,
} from "@/features/newsletterEmails/schema";

type Subscriber = {
  id: number;
  email: string;
  categories: string[];
};

type AuthState = "loading" | "unauthenticated" | "forbidden" | "authenticated";

const API_URL =
  process.env.SANITY_STUDIO_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

function categoryLabel(value: string) {
  return (categoryLabels as Record<string, string>)[value] ?? value;
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message ?? "Помилка входу");
      return;
    }
    onSuccess();
  };

  return (
    <Card padding={4}>
      <Stack gap={3}>
        <Text size={2} weight="bold">
          Увійдіть, щоб переглянути підписників
        </Text>
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInput
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && (
          <Card tone="critical" padding={2} radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        )}
        <Button
          text={loading ? "..." : "Увійти"}
          onClick={handleLogin}
          disabled={loading}
        />
      </Stack>
    </Card>
  );
}

export function NewsletterSubscribersTool() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setAuthState("unauthenticated");
        return;
      }
      if (res.status === 403) {
        setAuthState("forbidden");
        return;
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setSubscribers(data);
      setAuthState("authenticated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const { data } = await authClient.getSession();
        if (!isMounted) return;

        if (!data?.user) {
          setAuthState("unauthenticated");
          return;
        }

        const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
          credentials: "include",
        });

        if (!isMounted) return;

        if (res.status === 401) {
          setAuthState("unauthenticated");
          return;
        }
        if (res.status === 403) {
          setAuthState("forbidden");
          return;
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const subscribersData = await res.json();
        setSubscribers(subscribersData);
        setAuthState("authenticated");
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цього підписника?")) return;
    try {
      const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.status === 403) {
        alert("Недостатньо прав для видалення");
        return;
      }
      if (!res.ok) throw new Error("Failed to delete");
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Не вдалося видалити підписника");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setAuthState("unauthenticated");
  };

  if (authState === "loading") {
    return (
      <Flex padding={4} justify="center">
        <Spinner muted />
      </Flex>
    );
  }

  if (authState === "unauthenticated") {
    return <LoginForm onSuccess={() => window.location.reload()} />;
  }

  if (authState === "forbidden") {
    return (
      <Card padding={4} tone="critical">
        <Stack gap={3}>
          <Text weight="bold">Доступ заборонено</Text>
          <Text size={1}>
            Ваш акаунт не має прав адміністратора для перегляду підписників.
          </Text>
          <Button
            text="Увійти як інший користувач"
            tone="critical"
            onClick={handleSignOut}
          />
        </Stack>
      </Card>
    );
  }

  if (loading && subscribers.length === 0) {
    return (
      <Flex padding={4} justify="center">
        <Spinner muted />
      </Flex>
    );
  }

  if (error) {
    return (
      <Card padding={4} tone="critical">
        <Stack gap={3}>
          <Text>Помилка завантаження: {error}</Text>
          <Button text="Спробувати знову" onClick={fetchSubscribers} />
        </Stack>
      </Card>
    );
  }

  const filteredSubscribers = categoryFilter
    ? subscribers.filter((sub) => sub.categories?.includes(categoryFilter))
    : subscribers;

  return (
    <Card padding={4}>
      <Stack gap={4}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold">
            Підписники розсилки ({filteredSubscribers.length})
          </Text>
          <Flex gap={2}>
            <Button
              text={loading ? "Оновлення..." : "Оновити"}
              mode="ghost"
              onClick={fetchSubscribers}
              disabled={loading}
            />
            <Button
              text="Вийти"
              mode="ghost"
              tone="critical"
              onClick={handleSignOut}
            />
          </Flex>
        </Flex>

        <Flex gap={2} wrap="wrap">
          <Button
            text="Усі"
            mode={categoryFilter === null ? "default" : "ghost"}
            tone={categoryFilter === null ? "primary" : "default"}
            onClick={() => setCategoryFilter(null)}
          />
          {CATEGORY_VALUES.map((value) => (
            <Button
              key={value}
              text={categoryLabel(value)}
              mode={categoryFilter === value ? "default" : "ghost"}
              tone={categoryFilter === value ? "primary" : "default"}
              onClick={() => setCategoryFilter(value)}
            />
          ))}
        </Flex>

        <Stack gap={2}>
          {filteredSubscribers.map((sub) => (
            <Card key={sub.id} padding={3} radius={2} shadow={1}>
              <Flex justify="space-between" align="center">
                <Stack gap={2}>
                  <Text weight="semibold">{sub.email}</Text>
                  <Flex gap={2} wrap="wrap">
                    {sub.categories?.map((cat) => (
                      <Badge key={cat} tone="primary">
                        {categoryLabel(cat)}
                      </Badge>
                    ))}
                  </Flex>
                </Stack>
                <Button
                  icon={TrashIcon}
                  mode="ghost"
                  tone="critical"
                  onClick={() => handleDelete(sub.id)}
                />
              </Flex>
            </Card>
          ))}

          {filteredSubscribers.length === 0 && !loading && (
            <Text muted>
              {categoryFilter
                ? "Немає підписників у цій категорії"
                : "Поки що немає підписників"}
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
