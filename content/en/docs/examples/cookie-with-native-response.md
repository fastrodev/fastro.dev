---
title: "Cookie with Native Response"
description: "How to manage cookies with native response"
lead: "How to manage cookies with native response"
date: 2020-10-10T15:21:01+02:01
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
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "https://deno.land/std@0.133.0/http/cookie.ts"

import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application()

app.get("/set", () => {
  const headers = new Headers()
  const cookie: Cookie = { name: "Space", value: "Cat" }
  setCookie(headers, cookie)

  return new Response(JSON.stringify(cookie), {
    headers
  })
})

app.get("/delete", () => {
  const headers = new Headers()
  deleteCookie(headers, "Space")
  const cookies = getCookies(headers)

  return new Response(JSON.stringify(cookies), {
    headers,
  })
})

app.get("/check", (req: Request) => {
  const cookie = getCookies(req.headers)
  return new Response(JSON.stringify(cookie))
})

console.log("Listening on: http://localhost:8000")

await app.serve()

```

## How to run

```shell
deno run -A --unstable main.ts
```
