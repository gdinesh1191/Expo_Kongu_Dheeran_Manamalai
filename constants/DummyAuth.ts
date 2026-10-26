// Dummy credentials for testing until the real login API is wired up.
export type LoginRole = "user" | "staff";

export const DUMMY_USERS: Record<LoginRole, { username: string; password: string }> = {
  user: { username: "user", password: "user@123" },
  staff: { username: "staff", password: "staff@123" },
};

export const DUMMY_OTP = "1234";

export type CredentialResult = "ok" | "invalidUsername" | "invalidPassword";

export function checkCredentials(
  role: LoginRole,
  username: string,
  password: string
): CredentialResult {
  const account = DUMMY_USERS[role];
  if (username.trim().toLowerCase() !== account.username) return "invalidUsername";
  if (password !== account.password) return "invalidPassword";
  return "ok";
}
