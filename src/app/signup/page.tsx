"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

async function realSignup({ name, email, password, address }: { name: string; email: string; password: string; address: string }) {
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        address,
        image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "women" : "men"}/${Math.floor(Math.random() * 99) + 1}.jpg`,
        joined: new Date().toISOString().split("T")[0],
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Signup failed." };
    }
    return { success: true, message: "Signup successful!" };
  } catch (error: any) {
    return { success: false, message: error.message || "Network error." };
  }
}

export default function SignupPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router]);

  const mutation = useMutation({
    mutationFn: realSignup,
    onSuccess: (data) => {
      if (data.success) {
        setTimeout(() => {
          router.push(callbackUrl);
        }, 1000);
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
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-blue-800">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-semibold text-blue-800">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Signing up..." : "Sign Up"}
        </button>
        {mutation.isSuccess && (
          <div className={`text-center font-semibold ${mutation.data.success ? "text-green-600" : "text-red-600"}`}>
            {mutation.data.message}
          </div>
        )}
        {mutation.isError && (
          <div className="text-center text-red-600 font-semibold">Something went wrong.</div>
        )}
      </form>
    </div>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ name, email, password, address });
  }
} 