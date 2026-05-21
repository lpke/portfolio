This is my portfolio website, built with Next.js.

# Working with Next.js

If asked to make changes that require Next.js specific knowledge, the following applies:

> **This is NOT the Next.js you know**
>
> This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Rules

- The user runs a local development server on localhost:3000. When wanting to spin up a dev server for yourself, do not try to kill the user's this process. If it is running, you may attempt to access it for debugging. If running, you wont be able to spin up another (user's one will own the project lock).
- If user isnt running their server, you may run your own at port 3001 (not default 3000). After finishing, ALWAYS ensure your dev server is shut down if you started one up during your workflow.
- If you must start a dev server of your own and this will have real benefit to the quality of your output but you aren't able to due to restrictions outlined above, proceed with another method but let the user know in the summary at the end why you needed the server and if you still do.
- ALL constants and reusable config must go into `src/app/_utils/constants.ts`
- Exception: skill body copy and skill card content should be composed directly in the relevant skill content component, not stored in `constants.ts`.
- NO barrel files. Import modules directly from their source files.
- All reusable components must live under `src/app/_components/`. Do not hide components in section-local `components/` folders without a very good reason. Pages, layouts, top-level section components, and skill content page components are allowed outside `_components/`.
