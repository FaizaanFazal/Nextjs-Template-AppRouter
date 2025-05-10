// src/app/protected/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect }            from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Protected content</h1>
      <p>Welcome back, {session.user?.name ?? session.user?.email}!</p>
    </div>
  );
}
