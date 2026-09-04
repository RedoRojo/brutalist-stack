"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../actions";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Authentication failed");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 bg-grit border border-ash/40 p-8 space-y-6">
      <div className="space-y-2 border-b border-ash/15 pb-4">
        <h1 className="text-xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
          Access Restricted
        </h1>
        <p className="text-xs font-mono text-ash">
          Administrator credentials required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono">
        <div className="space-y-2">
          <label
            htmlFor="pass"
            className="text-xs font-bold uppercase tracking-wider block text-bone/60"
          >
            Password
          </label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="w-full px-3 py-2 border border-ash/40 bg-void rounded-none focus:outline-none focus:border-rust text-sm text-bone"
          />
        </div>

        {error && (
          <div className="border border-rust/30 bg-rust/5 p-3 text-xs text-rust font-mono">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary px-4 py-2 font-bold text-sm tracking-wide uppercase disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
