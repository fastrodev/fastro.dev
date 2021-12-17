---
title: "Module"
date: 2021-12-16T05:00:47+07:00
authors: ["Admin"]
summary: "Cara bikin aplikasi hello world di golang dari awal banget"
tags: [go]
categories: [golang-dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang cara membuat aplikasi hello world di golang dari awal banget.

Dan sebagai persiapan: 
- [install go](https://go.dev/doc/install).
- siapkan terminal favoritmu.

## Buat folder
Buka terminal dan masuk ke sembarang direktori.
```shell
mkdir app
```
`app` bisa kita ganti dengan apapun.

## Masuk ke folder
```shell
cd app
```

## Buat inisialisasi modul
```shell
go mod init app
```
Di sini, `go mod init` adalalah perintah untuk membuat module dari golang. Sedangkan `app` adalah nama modul. 

Tapi sebenarnya kita bisa ganti dengan apapun. 

Misalnya: `github.com/fastrodev/app`

## Buat file entry point
```shell
touch main.go
```
Pada umumnya, file entry point di golang bernama `main.go`. 

Tapi kita bisa ganti dengan apapun. 

Misalnya: `app.go`

## Copy dan paste
Salin dan tempel kode berikut pada `main.go`.
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
```

## Jalankan aplikasi
```shell
go run main.go
```

## Hasil
Jika kode di atas kita jalankan, di terminal akan tercetak text seperti ini:
```shell
Hello, 世界
```

## Praktikum

Clone source code berikut [https://github.com/fastrodev/praktikum-module](https://github.com/fastrodev/praktikum-module):
```shell
git clone https://github.com/fastrodev/praktikum-module.git .
```

Jalankan aplikasi seperti di atas.







