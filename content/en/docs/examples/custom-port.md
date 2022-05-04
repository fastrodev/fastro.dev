---
title: "Custom port"
description: "How to change the default port"
lead: "How to change the default port"
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

```typescript
import application from "https://deno.land/x/fastro@v0.54.0/server/mod.ts";

const app = application();

app.get("/", () => "Hello world!");

await app.serve({ port: 3000 });
```
