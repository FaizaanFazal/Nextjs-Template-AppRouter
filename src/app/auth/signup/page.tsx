// src/app/auth/signup/page.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (res.ok) {
            router.push("/auth/signin")
        } else {
            setError(data.error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xs mx-auto p-4"
        >
            <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>

            {error && (
                <p className="text-red-500 mb-2">
                    {error}
                </p>
            )}

            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 mb-1"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 mb-1"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
                Create account
            </button>

            <p className="mt-4 text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <a
                    href="/auth/signin"
                    className="text-blue-600 hover:underline"
                >
                    Sign In
                </a>
            </p>
        </form>

    )
}
