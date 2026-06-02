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
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 border-brutal bg-[#fafafa] p-8 shadow-brutal space-y-6">
      <div className="space-y-2 border-b border-[#1a1a1a]/10 pb-4">
        <h1 className="text-xl font-bold font-mono uppercase tracking-tight flex items-center gap-2">
          <span className="text-[#c02b2b]">■</span> Access Restricted
        </h1>
        <p className="text-xs font-mono text-[#1a1a1a]/60">
          Administrator credentials required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-mono">
        <div className="space-y-2">
          <label htmlFor="pass" className="text-xs font-bold uppercase tracking-wider block">
            Enter admin passcode:
          </label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="w-full px-3 py-2 border border-[#1a1a1a] bg-white rounded-none focus:outline-none focus:ring-1 focus:ring-[#c02b2b] text-sm"
          />
        </div>

        {error && (
          <div className="border border-[#c02b2b]/30 bg-[#c02b2b]/5 p-3 text-xs text-[#c02b2b] font-mono">
            Error: {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 border border-[#1a1a1a] bg-[#c02b2b] text-[#fafafa] font-bold text-sm tracking-wide uppercase hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-brutal disabled:opacity-50"
        >
          {loading ? "[Authenticating...]" : "[Verify Passcode]"}
        </button>
      </form>
    </div>
  );
}
