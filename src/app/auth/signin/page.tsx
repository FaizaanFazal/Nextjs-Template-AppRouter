"use client"
import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (res?.error) {
            setError("Invalid credentials")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
            {error && (
                <p className="text-red-500 mb-2">
                    {error}
                </p>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="email">
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
                <label className="block text-gray-700 mb-1" htmlFor="password">
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
                Log in
            </button>

            <p className="mt-4 text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <a
                    href="/auth/signup"
                    className="text-blue-600 hover:underline"
                >
                    Sign Up
                </a>
            </p>
        </form>

    )
}
