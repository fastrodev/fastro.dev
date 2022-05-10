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

![](https://deno.land/v1.png)

SSR implementation is quite complicated. fastro simplifies it with a simple API. it does bundling and hydration at application initiation so that the loading process is faster.

#### Configuration

Create deno configuration file: `deno.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "https://esm.sh/react"
  }
}
```

Create vscode configuration file: `.vscode/settings.json`

```json
{
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[markdown]": {
    "editor.formatOnSave": false
  },
  "deno.enable": true,
  "deno.unstable": true,
  "deno.lint": true,
  "deno.suggest.imports.hosts": {
    "https://deno.land": true
  },
  "deno.config": "./deno.json"
}
```

### Create app and static dirs

```shell
mkdir app
mkdir static
```

#### Component

Create react component: `app/app.tsx`

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

#### Endpoint

Create routing file: `app/api.tsx`

```tsx
import application, { response } from "https://deno.land/x/fastro@v0.57.1/server/mod.ts";
import rendering from "https://deno.land/x/fastro@v0.57.1/server/ssr.ts";
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

#### How to run locally

```shell
deno run -A --unstable app/api.tsx
```

Source-code: [ssr-example](https://github.com/fastrodev/ssr-example)
