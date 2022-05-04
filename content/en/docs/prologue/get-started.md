---
title: "Getting Started"
description: "How to start a simple web application."
lead: "How to start a simple web application."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 110
menu:
  docs:
    parent: "prologue"
toc: true
---

## Create webapp directory

- This will be the working directory of your web application.

  ```cmd
  mkdir webapp && cd webapp
  ```

- Open vscode editor from the working directory

  ```cmd
  code .
  ```

## Create entry point file

- This will be the entry point of Deno CLI.

  ```tsx
  import application from "https://deno.land/x/fastro@v0.54.0/server/mod.ts";

  const app = application();

  app.get("/", () => "Hello world");

  await app.serve();
  ```

## Run locally

- You can run the webapp from local

  ```cmd
  deno run -A --unstable main.ts
  ```

- Or try running a simple program from repo:

  ```cmd
  deno run -A --unstable https://deno.land/x/fastro@v0.54.0/examples/main.ts
  ```

## Deploy

- When clicking the "Deploy" button -- deno-deploy will automatically download all the application code and create a new deployment.

[![alt text](/images/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://deno.land/x/fastro@v0.54.0/examples/main.ts)
