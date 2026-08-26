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

type Subscriber = {
  id: number;
  email: string;
  categories: string[];
};

const API_URL = process.env.SANITY_STUDIO_API_URL ?? "http://localhost:3000";

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
      <Stack space={3}>
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
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  // Initialize loading to true so we don't need synchronously calling setLoading inside useEffect
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial Auth Check
  useEffect(() => {
    let isMounted = true;
    authClient.getSession().then(({ data }) => {
      if (isMounted) {
        setAuthenticated(!!data?.user);
        if (!data?.user) {
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Subscribers Callback
  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        credentials: "include",
      });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on initial authentication pass
  useEffect(() => {
    if (!authenticated) return;

    const controller = new AbortController();

    fetch(`${API_URL}/api/newsletter-subscribers`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 401) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        setSubscribers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [authenticated]);

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цього підписника?")) return;
    try {
      const res = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Не вдалося видалити підписника");
    }
  };

  if (authenticated === null) {
    return (
      <Flex padding={4} justify="center">
        <Spinner muted />
      </Flex>
    );
  }

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
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
        <Text>Помилка завантаження: {error}</Text>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold">
            Підписники розсилки ({subscribers.length})
          </Text>
          <Button
            text={loading ? "Оновлення..." : "Оновити"}
            mode="ghost"
            onClick={fetchSubscribers}
            disabled={loading}
          />
        </Flex>

        <Stack space={2}>
          {subscribers.map((sub) => (
            <Card key={sub.id} padding={3} radius={2} shadow={1}>
              <Flex justify="space-between" align="center">
                <Stack space={2}>
                  <Text weight="semibold">{sub.email}</Text>
                  <Flex gap={2} wrap="wrap">
                    {sub.categories?.map((cat) => (
                      <Badge key={cat} tone="primary" mode="outline">
                        {cat}
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

          {subscribers.length === 0 && !loading && (
            <Text muted>Поки що немає підписників</Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
