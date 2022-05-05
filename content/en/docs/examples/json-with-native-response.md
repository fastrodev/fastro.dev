---
title: "JSON with Native Response"
description: "How to return JSON with Native Response"
lead: "How to return JSON with Native Response"
date: 2020-10-13T15:21:01+02:02
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 130
toc: true
---

```ts
import application, { response } from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/", () => {
  const res = response();
  return res.json({ text: "Hello world" });
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```