# Chrome Extension using Full “hosted” Next.js app (Server + Prisma + NextAuth)

A modern starter kit for building a Chrome Extension with:

- **Next.js** (App Router & Server Actions)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** for database access
- **Zustand** for client-side state

---

## Prerequisites

- Node.js v18 or later
- npm v8 or later

---

## Installation Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate and synchronize your Prisma client:

   ```bash
   npm run prisma:sync
   ```

---

## Development

1. Start the Next.js development server:

   ```bash
   npm run dev
   ```

2. In a separate Chrome window:

   - Open `chrome://extensions`
   - Enable **Developer mode** (toggle in the top-right)
   - Click **Load unpacked**
   - Select this project’s `public/` folder

3. Click the extension icon in the toolbar — a popup window will open at `http://localhost:3000/`.

---

## Project Structure

```
.
├── public/
│   ├── manifest.json         # Chrome extension manifest
│   ├── background.js         # Service worker that opens the popup
│   └── images/
│       └── extension_16.png  # Extension icons
├── src/
│   ├── app/
│   │   ├── page.tsx          # Popup UI component (uses Zustand)
│   │   └── api/
│   │       └── clicks/
│   │           └── route.ts  # REST API for click count
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client initialization
│   │   └── server-actions.ts # Server Actions for load/increment
│   └── store/
│       └── clicks.ts         # Zustand store (load & inc)
├── prisma/
│   └── schema.prisma         # Your Prisma schema
├── next.config.js            # Next.js configuration
├── package.json              # npm scripts & dependencies
└── README.md                 # This file
```

---

## How It Works

- **Extension package** (the `public/` folder) only contains:
  - `manifest.json`
  - `background.js`
  - icons and any static assets

- When the toolbar icon is clicked, **`background.js`** opens a popup window at `http://localhost:3000/`.

- **Next.js** serves the popup UI at `/`:
  - Uses React + Zustand to display and update a counter.
  - Calls **`GET /api/clicks`** to fetch the latest count.
  - Calls **`POST /api/clicks`** to persist the new count.

- **Server Actions** (or the REST route) use **Prisma** to read/write your database.

---

## Building for Production

1. Build and generate Prisma client:

   ```bash
   npm run prisma:sync
   npm run build
   ```

2. Ensure **`background.js`** points to your production URL:

   ```js
   const EXT_URL = 'https://your-production-domain.vercel.app/';
   ```

3. Zip up the **same** `public/` folder and publish to the Chrome Web Store.

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Chrome Extensions Docs](https://developer.chrome.com/docs/extensions/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)


## URLs to update
1. public/Manifest file (host_permissions,content_security_policy)
2. public/popup.html
3. ENV
4. public\assets\js\background.js