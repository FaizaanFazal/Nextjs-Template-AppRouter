// src/app/api/clicks/route.ts
import { incrementCount, loadCount } from '@/lib/server-actions';
import { NextResponse } from 'next/server';

export async function GET() {
  const count = await loadCount();
  return NextResponse.json({ count });
}

export async function POST(req: Request) {
  const { count } = (await req.json()) as { count: number };
  const newCount = await incrementCount(count);
  return NextResponse.json({ count: newCount });
}
