'use client';
import { useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useClickStore } from '@/store/clicks';
// import SignInWithGithub from '@/components/section/SignInWithGithub/SignInWithGithub';
import NavButtons from '@/components/section/NavButtons/NavButtons';
import SignInPage from './auth/signin/page';

export default function HomePage() {
  const { data: session, status } = useSession();
  const { count, load, inc } = useClickStore();

  useEffect(() => {
    if (status === 'authenticated') {
      load();
    }
  }, [status, load]);

    useEffect(() => {
    if (status === 'authenticated') {
      window.parent.postMessage({ type: 'CLOSE_POPUP' }, '*')
    }
  }, [status])
  
  if (status === 'loading') {
    return <div style={{ padding: 16 }}>Loading…</div>;
  }

  if (!session) {
    return (
     <SignInPage />
    );
  }

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 12 }}>
        Signed in as <strong>{session.user?.email}</strong>
      </div>

      <h2>Counter</h2>
      <div style={{ fontSize: 24, margin: '8px 0' }}>Count: {count}</div>
      <button onClick={() => inc()} style={{ padding: '6px 12px' }}>
        +1 and save
      </button>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => signOut()}
          style={{ padding: '6px 12px', background: '#e53e3e', color: 'white' }}
        >
          Sign out
        </button>
      </div>
      <NavButtons backHref={undefined} nextHref="/extension" />
    </div>
  );
}

