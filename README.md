# momentum

A habit tracker that doesn't stress you out with streaks

## Developing

```bash
npm install

# start dev server
npm run dev
```

### Generating supabase types

```bash
npx supabase gen types typescript --project-id "izkolwgbaukbhqyzdvro" --schema public > src/lib/types/supabase.ts
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
