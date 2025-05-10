'use client';

import NavButtons from '@/components/section/NavButtons/NavButtons';
import { useState } from 'react';

export default function ExtensionPage() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }} className='flex flex-col justify-between'>
      <div>
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
      </div>


      <NavButtons backHref={"/"} nextHref="/extension" />
    </main>
  );
}
