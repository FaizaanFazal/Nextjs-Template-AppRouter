import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
  }
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }
  const hashedPassword = await hash(password, 12)
  await prisma.user.create({
    data: { name, email, hashedPassword },
  })
  return NextResponse.json({ ok: true })
}
