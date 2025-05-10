'use client';
import { signIn } from 'next-auth/react';

export default function SignInWithGithub() {

  return (
    <div style={{ padding: 16, textAlign: 'center' }}>
    <h1>Please sign in</h1>
    <button
      onClick={() => signIn('github')}
      style={{ marginTop: 12, padding: '8px 16px', fontSize: 16 }}
    >
      Sign in with GitHub
    </button>
  </div>
  );
}
