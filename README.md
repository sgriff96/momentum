# momentum

A habit tracker that doesn't stress you out with streaks

The primary motivation behind this application is learning SvelteKit and Svelte.

## Developing

```bash
cd ui
npm install

# start dev server
cd ui
npm run dev
```

### Generating supabase types

```bash
npx supabase gen types typescript --project-id "projectId" --schema public > src/lib/types/supabase.ts
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
