# Markdown2Html Image online parser

> A tiny project to help people convert markdown images to HTML tag

## Problem

Despite markdown being popular among devs, non-technical people find it hard to understand its syntax, mainly how it works.

The problem this project solves came from the following support question:

> "How can I define the image size in markdown?"

I noticed that even I explained, the person had never written a single line of HTML, which I ended up parsing the links manually.

## Techs

- [Svelte](https://svelte.dev/) + [Sveltekit](https://kit.svelte.dev/) as JS Framework
- [xstate](https://xstate.js.org/) for handling finite state machine
- [TailwindCSS](https://tailwindcss.com/) for styles
- [Vercel](https://vercel.com/) for hosting

## Running locally

First, ensure you have `pnpm` installed globally. If not, install it via:

```
npm install -g pnpm
```

Then, install the project dependencies:

```
pnpm install
```

Finally, run the project:

```
pnpm dev
```

## LICENSE

[MIT](./LICENSE)
