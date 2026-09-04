// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
});
