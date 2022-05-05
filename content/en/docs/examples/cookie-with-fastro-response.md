---
title: "Cookie with Fastro Response"
description: "How to manage cookies"
lead: "How to manage cookies"
date: 2020-10-10T15:21:01+02:01
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

```ts
import application, {
  Cookie,
  getCookies,
  response,
} from "https://deno.land/x/fastro@{{< param fastroVersion >}}/server/mod.ts";

const app = application();

app.get("/set", () => {
  const res = response();
  const cookie: Cookie = { name: "Space", value: "Cat" };

  return res.setCookie(cookie)
    .send(JSON.stringify(cookie));
});

app.get("/delete", () => {
  const res = response();
  return res.deleteCookie("Space").send("Cookie deleted");
});

app.get("/check", (req: Request) => {
  const res = response();
  const cookie = getCookies(req.headers);
  return res.send(JSON.stringify(cookie));
});

console.log("Listening on: http://localhost:8000");

await app.serve();
```

## How to run

```shell
deno run -A --unstable main.ts
```
