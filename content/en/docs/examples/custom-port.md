---
title: "Custom port"
description: "How to change the default port"
lead: "How to change the default port"
date: 2020-10-13T15:21:01+02:00
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

```typescript
import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/", () => "Hello world!");

await app.serve({ port: 3000 });
```

## How to run

```shell
deno run -A --unstable main.ts
```
