---
title: "JSX with Default Response"
description: "How to return html with JSX Default Response"
lead: "How to return html with JSX Default Response"
date: 2020-10-13T15:21:01+02:02
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 130
toc: true
---

## Entry point

File `main.tsx`

```tsx
import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts"

const app = application()

app.get("/", () => <h1>Hello world</h1>)

console.log("Listening on: http://localhost:8000")

await app.serve()
```

## Configuration

File `deno.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "https://esm.sh/react"
  }
}
```

## How to run

```shell
deno run -A --unstable --config deno.json main.tsx
```
