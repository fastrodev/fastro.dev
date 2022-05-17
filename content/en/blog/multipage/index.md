---
title: "Multipage SSR with React and Deno"
description: "In this guide you will learn how easy and clean to setup Multipage SSR in Fastro."
lead: "In this guide you will learn how easy and clean to setup Multipage SSR in Fastro."
date: 2022-05-17T00:00:00+01:00
draft: false
weight: 50
images: ["multipage-ssr.png"]
contributors: ["ynwd"]
---

![deno](https://deno.land/v1.png)

In [previous version](https://fastro.dev/blog/ssr-with-react-and-deno/), you can only create one page SSR in a webapp. In this version you can make Multiple SSR Pages with simple api to set HTML title, meta, script, link, and script.

## App structure

```shell
.
├── hello
│   └── app.tsx
├── app.tsx
├── static
├── server.tsx
└── deno.json
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
mkdir static && mkdir hello
```

- `static` is folder for hydrated and bundled files created during app initiation. This file will be accessed by the default `index.html`.

- `hello` is folder for hello component & page.

- In this version, you do not need `components` folder again. The default folder is already set internally to `./`.

## Default page component

File: `app.tsx`

```tsx
// @deno-types="https://cdn.esm.sh/v78/@types/react@18.0.9/react.d.ts"
import { createElement as h } from "https://esm.sh/react@18.1.0";

// @deno-types="https://cdn.esm.sh/v78/@types/react@18.0.9/react.d.ts"
import React from "https://esm.sh/react@18.1.0";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <a href="/hello">hello</a>
    </div>
  );
};

export default App;

```

## Hello page component

File: `hello/app.tsx`

```tsx
// @deno-types="https://cdn.esm.sh/v78/@types/react@18.0.9/react.d.ts"
import { createElement as h } from "https://esm.sh/react@18.1.0";

// @deno-types="https://cdn.esm.sh/v78/@types/react@18.0.9/react.d.ts"
import React from "https://esm.sh/react@18.1.0";

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello World</h1>
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
// @deno-types="https://cdn.esm.sh/v78/@types/react@18.0.9/react.d.ts"
import { createElement as h } from "https://esm.sh/react@18.1.0";
import application, {
  response,
} from "https://deno.land/x/fastro@v0.58.3/server/mod.ts";
import ssr from "https://deno.land/x/fastro@v0.58.3/server/ssr.ts";
import App from "./app.tsx";
import Hello from "./hello/app.tsx";

const appPage = ssr(<App />);
const helloPage = ssr(<Hello />).dir("./hello");

const app = application()
  .static("/static")
  .page("/", appPage, () => {
    return response()
      .ssr(appPage)
      .title("Hello world")
      .render();
  })
  .page("/hello", helloPage, (req: Request) => {
    return response(req)
      .ssr(helloPage)
      .title("Click me")
      .meta(`charset="utf-8"`)
      .meta(`name="viewport" content="width=device-width"`)
      .script(`(function (){console.log("hello")})();`)
      .style(`body {background-color: powderblue;}`)
      .render();
  });

console.log("Listening on: http://localhost:8000");

await app.serve();

```

In this file we create 3 endpoints:

- `/` is the root webapp.
- `/hello` is for hello page.
- `/static` is where `bundle.js` and `hello.js` available. Both are generated automatically when you run the webapp.

Please note that for custom page/component:

- You must append component path. In this case:

```tsx
const helloPage = ssr(<Hello />).dir("./hello");
```

- You must inject `Request` on response initiation. This is used to get the request url. This url is used to get the bundled files created on app initiation. In this case:

```tsx
return response(req)
```

## How to run locally

```shell
deno run -A --unstable server.tsx
```

## Demo

[https://fastrodev-ssr.deno.dev](https://fastrodev-ssr.deno.dev)

## Source-code

[multipage-ssr-example](https://github.com/fastrodev/multipage-ssr-example)
