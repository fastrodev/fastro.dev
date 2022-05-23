---
title: "Fastro 0.59.0 Release Notes"
description: "Fastro 0.59.0 has been tagged and released with the following new features and changes"
lead: "Adds getQuery and removes unstable deno emit."
date: 2022-05-23T00:00:00+01:00
draft: false
weight: 50
contributors: ["ynwd"]
---

Fastro [0.59.0](https://deno.land/x/fastro@v0.59.0) has been tagged and released with the following new features and changes:

- [Upgrade to Deno std@0.140.0](#upgrade-to-deno-std01400)
- [Removal of unstable deno.emit](#removal-of-unstable-deno-emit)
- [Add getQueries & getQuery](#add-getqueries-and-getquery)

## Upgrade to deno std@0.140.0

Upgrade with the [latest deno standard 0.140.0](https://deno.land/std@0.140.0). The following is a note for the changes in deno: [Deno 1.22 Release Notes](https://deno.com/blog/v1.22)

## Removal of unstable deno emit

In [previous version](https://fastro.dev/blog/multipage-ssr-with-react-and-deno/), to run [SSR entrypoint](https://github.com/fastrodev/multipage-ssr-example/blob/main/server.tsx) you must include `--unstable`:

```shell
deno run -A --unstable server.tsx
```

In this version you can run without it:

```shell
deno run -A server.tsx
```

Fastro removed [Deno.emit()](https://deno.com/blog/v1.22#removal-of-unstable-denoemit-denoformatdiagnostics-and-denoapplysourcemap-apis) and changed it with [esbuild](https://deno.land/x/esbuild).

## Add getQueries and getQuery

- You can get queries parameter from url: `http://localhost:8000/hello?id=5&name=agus`

- You can also get query parameter from url: `http://localhost:8000/welcome?id=5&name=agus`

```ts
import application, { getQueries, getQuery } from "https://deno.land/x/fastro@v0.59.0/server/mod.ts";

const app = application();

app.get("/hello", (req: Request) => {
  return getQueries(req);
});

app.get("/welcome", (req: Request) => {
  return getQuery(req, "name");
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```
