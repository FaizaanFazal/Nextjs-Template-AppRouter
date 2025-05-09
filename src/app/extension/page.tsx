'use client';

import { useState } from 'react';

export default function ExtensionPage() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Extension Counter</h1>
      <button
        style={{
          fontSize: 16,
          padding: '8px 16px',
          cursor: 'pointer',
        }}
        onClick={() => setCount((c) => c + 1)}
      >
        Increment: {count}
      </button>
    </main>
  );
}
