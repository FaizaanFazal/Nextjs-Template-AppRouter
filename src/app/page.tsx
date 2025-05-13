'use client';
import { useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useClickStore } from '@/store/clicks';
import SignInWithGithub from '@/components/section/SignInWithGithub/SignInWithGithub';
import NavButtons from '@/components/section/NavButtons/NavButtons';

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
     <SignInWithGithub />
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

// import { useEffect } from 'react';
// import { useClickStore } from '@/store/clicks';
// import NavButtons from '@/components/section/NavButtons/NavButtons';

// export default function Page() {
//   const { count, load, inc } = useClickStore();

//   useEffect(() => {
//     load();
//   }, [load, count]);

//   return (
//     <main style={{ padding: 16, fontFamily: 'sans-serif' }} className='flex flex-col justify-between'>
//       <div>
//         <h1>Extension Counter</h1>
//         <div style={{ margin: '12px 0', fontSize: 20 }}>Count: {count}</div>
//         <button
//           style={{ padding: '8px 16px', fontSize: 16 }}
//           onClick={() => inc()}
//         >
//           +1 and Save
//         </button>
//       </div>


//       <NavButtons backHref={undefined} nextHref="/extension" />
//     </main>
//   );
// }
