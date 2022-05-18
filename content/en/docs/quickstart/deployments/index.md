---
title: "Deployments"
description: "How to deploy the web app to deno deploy."
lead: "How to deploy the web app to deno deploy."
date: 2020-11-16T13:59:39+01:00
draft: false
images: []
weight: 110
menu:
  docs:
    parent: "quickstart"
toc: true
---

`deployctl` is a command line tool for deploying your code to Deno Deploy, and it's also a GitHub Action for the same purpose.

You can install `deployctl` command with the below command:

```shell
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
```

To deploy a local script:

```shell
deployctl deploy --project=helloworld hello_world.ts
```

To deploy a remote script:

```shell
deployctl deploy --project=helloworld https://deno.land/x/fastro/examples/hello_world.ts
```
