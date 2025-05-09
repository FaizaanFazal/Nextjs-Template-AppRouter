'use client';

import { useEffect } from 'react';
import { useClickStore } from '@/store/clicks';

export default function Page() {
  const { count, load, inc } = useClickStore();

  useEffect(() => {
    load();
  }, [load,count]);

  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Extension Counter</h1>
      <div style={{ margin: '12px 0', fontSize: 20 }}>Count: {count}</div>
      <button
        style={{ padding: '8px 16px', fontSize: 16 }}
        onClick={() => inc()}
      >
        +1 and Save
      </button>
    </main>
  );
}
