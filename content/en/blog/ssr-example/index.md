---
title: "SSR Simple Example with Deno"
description: "This is the Server Side Rendering Implementation with Fastro on Deno."
lead: "This is the Server Side Rendering Implementation with Fastro on Deno."
date: 2022-05-09T09:19:42+01:00
draft: false
weight: 50
images: ["deno-ssr.png"]
contributors: ["ynwd"]
---

![deno](https://deno.land/v1.png)

SSR implementation is quite complicated. Fastro simplifies it with a simple API and minimal config.

It does bundling and hydration at application initiation so that the loading process is faster.

## App structure

```shell
.
├── app
│   ├── api.tsx
│   └── app.tsx
├── deno.json
└── static
    └── bundle.js
```

## Configuration

Create deno configuration file: `deno.json`. This is used to configure TypeScript on Deno.

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "https://esm.sh/react"
  }
}
```

## Create app and static dirs

```shell
mkdir app && mkdir static
```

- `app` folder is place for components and entrypoint. This is the default name. If you change it, it will throw an error. See [the example](https://github.com/fastrodev/fastro/blob/main/examples/ssr/api.tsx) to see other implementation.

- `static` is folder for hydrated and bundled files created during app initiation. This file will be accessed by the default `index.html`.

## Component

Create react component: `app/app.tsx`. This is very basic react component. I got it from [https://dev.to/craigmorten/writing-a-react-ssr-app-in-deno-2m7](https://dev.to/craigmorten/writing-a-react-ssr-app-in-deno-2m7).

```tsx
import React from "https://esm.sh/react@17.0.2";

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello Deno Land!</h1>
      <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
      <p>You clicked the 🦕 {count} times</p>
    </div>
  );
};

export default App;

```

## Endpoint

Create routing file: `app/api.tsx`

```tsx
import application, { response } from "https://deno.land/x/fastro@v0.57.2/server/mod.ts";
import rendering from "https://deno.land/x/fastro@v0.57.2/server/ssr.ts";
import App from "./app.tsx";

const ssr = rendering().component(<App />);

const app = application(ssr)
  .static("/static")
  .get("/", () => {
    return response(ssr).render({ title: "Hello world" });
  });

console.log("Listening on: http://localhost:8000");

await app.serve();
```

In this file we create 2 endpoints:

- `/` is the root for react app.
- `/static` is the where `bundle.js` available.

## How to run locally

```shell
deno run -A --unstable app/api.tsx
```

Source-code: [ssr-example](https://github.com/fastrodev/ssr-example)
