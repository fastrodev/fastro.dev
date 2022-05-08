---
title: "Create entry point file"
description: "This will be the entry point of Deno CLI."
lead: "This will be the entry point of Deno CLI."
date: 2020-10-18T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "quickstart"
weight: 100
---

## Entrypoint

```typescript
import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/", () => "Hello world");

await app.serve();
```

## How to run
You can run the webapp from local.

```shell
deno run -A main.ts
```

Or try running a simple program from the repo.

```shell
deno run -A https://deno.land/x/fastro@{{< param fastroVersion >}}/examples/main.ts
```

## Examples

You can find more examples [on this page](https://github.com/fastrodev/fastro#more-examples).