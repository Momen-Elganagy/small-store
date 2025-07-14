"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

async function realLogin({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      return { success: false, message: "Network error." };
    }
    const users = await response.json();
    if (users.length === 0) {
      return { success: false, message: "No user found with this email." };
    }
    const user = users[0];
    if (user.password !== password) {
      return { success: false, message: "Incorrect password." };
    }
    return { success: true, message: "Login successful!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error." };
  }
}

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router]);

  const mutation = useMutation({
    mutationFn: realLogin,
    onSuccess: async (data) => {
      if (data.success) {
        router.push(callbackUrl);
      }
    },
  });

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-[80vh] text-xl text-blue-700">Checking session...</div>;
  }
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-white py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Login</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-blue-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-blue-800">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-blue-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-blue-500 text-sm"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
        {mutation.isSuccess && (
          <div className={`text-center font-semibold ${mutation.data.success ? "text-green-600" : "text-red-600"}`}>
            {mutation.data.message}
          </div>
        )}
        {mutation.isError && (
          <div className="text-center text-red-600 font-semibold">Something went wrong.</div>
        )}
        <div className="flex flex-col items-center mt-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.36 30.77 0 24 0 14.82 0 6.71 5.08 2.69 12.44l7.98 6.19C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.19 5.6C43.93 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.63a14.5 14.5 0 0 1 0-9.26l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.56l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.6 2.16-8.7 2.16-6.38 0-11.87-3.63-14.33-8.94l-7.98 6.19C6.71 42.92 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
            Sign in with Google
          </button>
          <span className="mt-4 text-gray-500 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline font-semibold">Create an account</a>
          </span>
        </div>
      </form>
    </div>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: true,
    });
  }
} 