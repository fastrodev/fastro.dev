---
title: "HTTP Status and Auth with Fastro Response"
description: "How to set http status and auth with fastro response"
lead: "How to set http status and auth with fastro response"
date: 2020-10-12T15:21:01+02:01
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
import application, { response } from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/", () => {
  const res = response();
  return res.status(200)
    .authorization("Basic YWxhZGRpbjpvcGVuc2VzYW1l")
    .send("status & basic auth");
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```

## How to run

```shell
deno run -A --unstable main.ts
```
