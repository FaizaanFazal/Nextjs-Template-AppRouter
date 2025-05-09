// 'use client';

// import { useClickStore } from '@/store/clicks';
// import { FC, PropsWithChildren, useEffect } from 'react';

// const BackgroundConnector: FC<PropsWithChildren> = ({ children }) => {
//   const setCount = useClickStore(state => state.setCount);

//   useEffect(() => {
//     // only run this code if we’re actually inside a chrome-extension:// popup
//     if (
//       typeof window.chrome !== 'undefined' &&
//       chrome.runtime != null &&
//       typeof chrome.runtime.connect === 'function'
//     ) {
//       const port = chrome.runtime.connect({ name: 'popup' });
//       port.onMessage.addListener((message: { type: string; clicks: number }) => {
//         if (message.type === 'click') {
//           setCount(message.clicks);
//         }
//       });
//       return () => port.disconnect();
//     }
//   }, [setCount]);

//   return <>{children}</>;
// };

// export default BackgroundConnector;
