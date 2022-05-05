---
title: "HTML with Fastro Response"
description: "How to return html with Fastro Response"
lead: "How to return html with Fastro Response"
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
  return res.html("<h2>Hello world</h2>");
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```