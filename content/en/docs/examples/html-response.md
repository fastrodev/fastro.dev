---
title: "HTML Response"
description: "How to return html response"
lead: "How to return html response"
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "examples"
weight: 130
toc: true
---

```ts
import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/", () => {
  return new Response("<html> Hello world </html>", {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```