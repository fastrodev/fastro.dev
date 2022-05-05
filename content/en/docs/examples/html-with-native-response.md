---
title: "HTML with Native Response"
description: "How to return html with native response"
lead: "How to return html with native response"
date: 2020-10-13T15:21:01+02:01
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 130
toc: true
---

## Entry point

File `main.ts`

```ts
import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts"

const app = application()

app.get("/", () => {
  return new Response("<html> Hello world </html>", {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  })
})

console.log("Listening on: http://localhost:8000")

await app.serve()
```

## How to run

```shell
deno run -A --unstable main.ts
```
