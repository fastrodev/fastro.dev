---
title: "SSR with React and Deno"
description: "This is the Simple Implementation of Server Side Rendering (SSR) with React and Deno. In this guide you will learn how easy and clean to setup SSR with Fastro."
lead: "This is the Simple Implementation of Server Side Rendering (SSR) with React and Deno. In this guide you will learn how easy and clean to setup SSR with Fastro."
date: 2022-05-10T00:00:00+01:00
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
├── components
│   └── app.tsx
├── deno.json
├── server.tsx
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
mkdir components && mkdir static
```

- `components` folder is place for react components. This is the default name. If you change it, it will throw an error. See [the example](https://github.com/fastrodev/fastro/blob/main/examples/ssr/api.tsx) to see other implementation.

- `static` is folder for hydrated and bundled files created during app initiation. This file will be accessed by the default `index.html`.

## Component

Create react component: `components/app.tsx`. This is very basic react component. I got it from [https://dev.to/craigmorten/writing-a-react-ssr-app-in-deno-2m7](https://dev.to/craigmorten/writing-a-react-ssr-app-in-deno-2m7).

```tsx
// @deno-types="https://cdn.esm.sh/v77/@types/react@18.0.9/react.d.ts"
import React from "https://esm.sh/react@18.1.0";

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

Create routing file: `server.tsx`

```tsx
import application, { response } from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";
import rendering from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/ssr.ts";
import App from "./components/app.tsx";

const component = rendering(<App />);

const app = application(component)
  .static("/static")
  .get("/", () => {
    return response(component).render({ title: "Hello world" });
  });

console.log("Listening on: http://localhost:8000");

await app.serve();
```

In this file we create 2 endpoints:

- `/` is the root for react app.
- `/static` is the where `bundle.js` available. `bundle.js` is generated automatically when you run the webapp.

## How to run locally

```shell
deno run -A --unstable server.tsx
```

Source-code: [ssr-example](https://github.com/fastrodev/ssr-example)
