---
title: "Hello world"
description: "How to return hello world text"
lead: "How to return hello world text"
date: 2020-10-14T15:21:01+02:00
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

await app.serve();
```

## How to run

```shell
deno run -A --unstable main.ts
```
