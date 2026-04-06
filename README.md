# devblog

A single-page blog application built with React, TypeScript, Firebase Firestore, Redux Toolkit, and Zod validation.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| UI | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| State management | Redux Toolkit |
| Database | Firebase Firestore |
| Form validation | Zod + React Hook Form |
| Styles | Tailwind CSS + @tailwindcss/typography |
| Fonts | DM Sans + DM Serif Display |

---

## Project Structure

```
src/
├── app/
│   ├── store.ts                # Redux store
│   └── hooks.ts                # Typed useAppDispatch / useAppSelector
├── features/
│   ├── posts/postsSlice.ts     # Posts CRUD + async thunks
│   ├── comments/commentsSlice.ts
│   └── filter/filterSlice.ts  # Search & tag filter
├── components/
│   ├── Navbar.tsx
│   ├── PostCard.tsx
│   ├── FilterBar.tsx
│   └── CommentList.tsx
├── pages/
│   ├── HomePage.tsx           
│   ├── PostPage.tsx            
│   └── PostFormPage.tsx       
├── hooks/
│   ├── usePosts.ts            
│   └── useFilter.ts           
├── lib/
│   ├── firebase.ts             
│   └── schemas.ts             
├── types/index.ts
├── App.tsx
└── index.css
```

---

## Quick Start

**1. Install dependencies**
```bash
npm install
```

**2. Configure Firebase**

Create a project at [console.firebase.google.com](https://console.firebase.google.com), enable Firestore, then copy your config keys.

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

**3. Run**
```bash
npm run dev       # development → http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | `HomePage` | Post list with search and tag filters |
| `/post/:id` | `PostPage` | Full post view with comments |
| `/create` | `PostFormPage` | Create a new post |
| `/edit/:id` | `PostFormPage` | Edit an existing post |