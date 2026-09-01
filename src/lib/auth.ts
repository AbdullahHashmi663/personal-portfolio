import crypto from "crypto";
import { createClient as createServerClient } from "@/lib/supabase/server";

export interface HashResult {
  hash: string;
  salt: string;
  iterations: number;
  algorithm: string;
}

const DEFAULT_ITERATIONS = 100000;
const KEY_LENGTH = 64; // bytes (128 hex characters)
const DIGEST = "sha512";
const ALGORITHM = "pbkdf2_sha512";

// Fallback secure constants if Supabase is offline or not yet initialized
const FALLBACK_SALT = process.env.ADMIN_PASSWORD_SALT || "fa0cfe8616c63888ea5f9c4e39b49c42";
const FALLBACK_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "9e3727114008f7e877223d8f5acd3e58fd8c95895bde60d431a3dfeb258cf7a966053a7fcd08fdb5c72b2762f52723fbc360dbd47ad862509cce47bf6a1d7511";

/**
 * Derives a PBKDF2 hash from a plaintext password using a cryptographically secure salt.
 */
export function hashPassword(
  password: string,
  salt = crypto.randomBytes(16).toString("hex"),
  iterations = DEFAULT_ITERATIONS
): HashResult {
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST)
    .toString("hex");

  return {
    hash,
    salt,
    iterations,
    algorithm: ALGORITHM,
  };
}

/**
 * Verifies a candidate password against a stored hash and salt using constant-time comparison.
 */
export function verifyPassword(
  password: string,
  storedHash: string,
  salt: string,
  iterations = DEFAULT_ITERATIONS
): boolean {
  try {
    const candidateHash = crypto
      .pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST)
      .toString("hex");

    const candidateBuf = Buffer.from(candidateHash, "hex");
    const storedBuf = Buffer.from(storedHash, "hex");

    if (candidateBuf.length !== storedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(candidateBuf, storedBuf);
  } catch {
    return false;
  }
}

/**
 * Verifies admin credentials against the Supabase `admin_auth` hashed table.
 * If Supabase is unreachable or unseeded, falls back to securely hashed server environment secrets.
 */
export async function verifyAdminCredentials(password: string): Promise<boolean> {
  if (!password || typeof password !== "string") {
    return false;
  }

  // 1. Attempt verification via Supabase `admin_auth` table
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes("your-project-id");

    if (!isMock) {
      const supabase = await createServerClient();
      const { data, error } = await (supabase.from("admin_auth") as any)
        .select("password_hash, salt, iterations")
        .eq("username", "admin")
        .maybeSingle();

      if (!error && data && data.password_hash && data.salt) {
        return verifyPassword(
          password,
          data.password_hash,
          data.salt,
          data.iterations || DEFAULT_ITERATIONS
        );
      }
    }
  } catch (err) {
    console.warn("Supabase admin_auth query note:", err);
  }

  // 2. Fallback to server-side cryptographic hash comparison
  return verifyPassword(password, FALLBACK_HASH, FALLBACK_SALT, DEFAULT_ITERATIONS);
}

/**
 * Creates or updates the hashed admin credentials in Supabase.
 */
export async function updateAdminPasswordInSupabase(newPassword: string): Promise<boolean> {
  const hashed = hashPassword(newPassword);

  try {
    const supabase = await createServerClient();
    const { error } = await (supabase.from("admin_auth") as any).upsert([
      {
        username: "admin",
        password_hash: hashed.hash,
        salt: hashed.salt,
        iterations: hashed.iterations,
        algorithm: hashed.algorithm,
        updated_at: new Date().toISOString(),
      },
    ]);

    return !error;
  } catch {
    return false;
  }
}
