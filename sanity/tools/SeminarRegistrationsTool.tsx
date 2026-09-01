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

type SeminarInfo = {
  _id: string;
  title: { children?: { text?: string }[] }[] | null;
  type: string[] | null;
};

type Registration = {
  id: string;
  seminarId: string;
  type: string;
  name: string;
  position: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  participants: string[];
  createdAt: string;
  seminar: SeminarInfo | null;
};

type AuthState = "loading" | "unauthenticated" | "forbidden" | "authenticated";

const API_URL =
  process.env.SANITY_STUDIO_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

const TYPE_LABELS_UA: Record<string, string> = {
  seminar: "Семінар",
  webinar: "Вебінар",
  recording: "Запис",
};

function seminarTitle(seminar: SeminarInfo | null) {
  if (!seminar?.title) return "Без назви";
  return (
    seminar.title
      .flatMap((block) => block.children?.map((c) => c.text ?? "") ?? [])
      .join("") || "Без назви"
  );
}

function seminarTypeLabels(seminar: SeminarInfo | null) {
  if (!seminar?.type?.length) return [];
  return seminar.type.map((t) => TYPE_LABELS_UA[t] ?? t);
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
      <Stack space={3}>
        <Text size={2} weight="bold">
          Увійдіть, щоб переглянути реєстрації
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

export function SeminarRegistrationsTool() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/seminar-registrations`, {
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
      setRegistrations(data);
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

        const res = await fetch(`${API_URL}/api/seminar-registrations`, {
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

        const data2 = await res.json();
        setRegistrations(data2);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити цю реєстрацію?")) return;
    try {
      const res = await fetch(`${API_URL}/api/seminar-registrations`, {
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
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Не вдалося видалити реєстрацію");
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
        <Stack space={3}>
          <Text weight="bold">Доступ заборонено</Text>
          <Text size={1}>
            Ваш акаунт не має прав адміністратора для перегляду реєстрацій.
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

  if (loading && registrations.length === 0) {
    return (
      <Flex padding={4} justify="center">
        <Spinner muted />
      </Flex>
    );
  }

  if (error) {
    return (
      <Card padding={4} tone="critical">
        <Stack space={3}>
          <Text>Помилка завантаження: {error}</Text>
          <Button text="Спробувати знову" onClick={fetchRegistrations} />
        </Stack>
      </Card>
    );
  }

  const filtered = typeFilter
    ? registrations.filter(
        (r) => r.type === typeFilter || r.seminar?.type?.includes(typeFilter),
      )
    : registrations;

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold">
            Реєстрації на семінари ({filtered.length})
          </Text>
          <Flex gap={2}>
            <Button
              text={loading ? "Оновлення..." : "Оновити"}
              mode="ghost"
              onClick={fetchRegistrations}
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

        {/* Filter Buttons */}
        <Flex gap={2} wrap="wrap">
          <Button
            text="Усі"
            mode={typeFilter === null ? "default" : "ghost"}
            tone={typeFilter === null ? "primary" : "default"}
            onClick={() => setTypeFilter(null)}
          />
          {Object.entries(TYPE_LABELS_UA).map(([value, label]) => (
            <Button
              key={value}
              text={label}
              mode={typeFilter === value ? "default" : "ghost"}
              tone={typeFilter === value ? "primary" : "default"}
              onClick={() => setTypeFilter(value)}
            />
          ))}
        </Flex>

        <Stack space={3}>
          {filtered.map((reg) => (
            <Card key={reg.id} padding={3} radius={2} shadow={1}>
              <Flex justify="space-between" align="flex-start" gap={3}>
                <Stack space={2} flex={1}>
                  <Flex gap={2} align="center" wrap="wrap">
                    <Text weight="semibold">{reg.name}</Text>
                    <Badge tone="default" mode="outline">
                      {reg.position}
                    </Badge>
                    {reg.type && (
                      <Badge tone="primary">
                        {TYPE_LABELS_UA[reg.type] ?? reg.type}
                      </Badge>
                    )}
                  </Flex>
                  <Text size={1} muted>
                    {reg.company}
                  </Text>
                  <Text size={1} muted>
                    {reg.address}
                  </Text>
                  <Flex gap={3} wrap="wrap">
                    <Text size={1}>{reg.phone}</Text>
                    <Text size={1}>{reg.email}</Text>
                  </Flex>

                  <Stack space={1} marginTop={2}>
                    <Text size={1} weight="semibold">
                      Учасники ({reg.participants?.length ?? 0}):
                    </Text>
                    {reg.participants?.map((p, i) => (
                      <Text key={i} size={1}>
                        · {p}
                      </Text>
                    ))}
                  </Stack>

                  <Stack space={1} marginTop={2}>
                    <Text size={1} weight="semibold">
                      Семінар: {seminarTitle(reg.seminar)}
                    </Text>
                    <Flex gap={2} wrap="wrap">
                      {seminarTypeLabels(reg.seminar).map((label) => (
                        <Badge key={label} tone="primary" mode="outline">
                          {label}
                        </Badge>
                      ))}
                    </Flex>
                  </Stack>

                  <Text size={1} muted>
                    {new Date(reg.createdAt).toLocaleString("uk-UA")}
                  </Text>
                </Stack>

                <Button
                  icon={TrashIcon}
                  mode="ghost"
                  tone="critical"
                  onClick={() => handleDelete(reg.id)}
                />
              </Flex>
            </Card>
          ))}

          {filtered.length === 0 && !loading && (
            <Text muted>
              {typeFilter
                ? "Немає реєстрацій цього типу"
                : "Поки що немає реєстрацій"}
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
