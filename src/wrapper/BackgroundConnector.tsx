'use client';

import { useClickStore } from '@/store/clicks';
import { FC, PropsWithChildren, useEffect } from 'react';

const BackgroundConnector: FC<PropsWithChildren> = ({ children }) => {
  // grab only the setter from your store
  const setCount = useClickStore(state => state.setCount);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'popup' });

    port.onMessage.addListener((message: { type: string; clicks: number }) => {
      if (message.type === 'click') {
        // update your local UI to whatever the background passed
        setCount(message.clicks);
      }
    });

    return () => {
      port.disconnect();
    };
  }, [setCount]);

  return <>{children}</>;
};

export default BackgroundConnector;
