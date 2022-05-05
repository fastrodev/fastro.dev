---
title: "Installation"
description: "How to install all fastro requirements"
lead: "How to install all fastro requirements"
date: 2020-10-20T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "quickstart"
weight: 100
toc: true
---

- Install the Deno CLI. This is for mac. *Other installation methods can be found [here](https://deno.land/manual@main/getting_started/installation).*

  ```shell
  curl -fsSL https://deno.land/install.sh | sh
  ```

- Ensure deno is available in the environment path

  ```shell
  deno --version
  ```

- Install [vscode deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
- Open the VS Code command palette with Ctrl+Shift+P, and run the `Deno: Initialize Workspace Configuration` command.
