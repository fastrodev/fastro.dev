---
title: "Create entry point file"
description: "Create main.ts file. This will be the entry point of Deno CLI."
lead: "Create main.ts file. This will be the entry point of Deno CLI."
date: 2020-10-18T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "quickstart"
weight: 100
---

  ```typescript
  import application from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

  const app = application();

  app.get("/", () => "Hello world");

  await app.serve();
  ```
  