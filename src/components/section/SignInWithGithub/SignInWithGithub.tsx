'use client';
import { signIn } from 'next-auth/react';

export default function SignInWithGithub() {
    const handleLogin = async () => {
      const res = await signIn('github', {
        redirect:    false,
        callbackUrl: window.location.origin + '/'
      });
      if (res?.url) {
        window.open(
          res.url,
          '_blank',
          'width=600,height=700'
        );
      }
    };
  return (
    <div style={{ padding: 16, textAlign: 'center' }}>
    <h1>Please sign in</h1>
    <button
      onClick={handleLogin}
      style={{ marginTop: 12, padding: '8px 16px', fontSize: 16 }}
    >
      Sign in with GitHub
    </button>
  </div>
  );
}
