---
title: "Interface"
date: 2021-12-11
authors: ["Admin"]
summary: "Memahami interface di golang dan bagaimana cara menggunakannya"
tags: [go]
categories: [programming]
series: [golang dasar]
---

Interface sering dipakai di golang. Catatan ini berisi penjelasan se-*simple* mungkin tentang interface dan cara menggunakannya.

### Signature

Yang kita maksud dengan signature di sini adalah definisi input dan output sebuah [method](https://blog.fastro.dev/posts/receiver/index.html#method).

Mencakup:
- semua parameter dan tipe datanya
- return value dan tipe datanya

Nah, interface adalah **tipe data** yang berisi satu atau beberapa *method signature.*

Contoh:
```go
package main

type Box interface {
	Add() int
	Scale(s int)
}
```
*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/hlZOyBr9rMm)*

Pada kode diatas, kita buat sebuah interface bernama Box. 

Di dalamnya ada definisi: 
- signature method `Add()` yang mengembalikan data bertipe `int`
- signature method `Scale(s int)` yang mengembalikan tipe data void.

### Implementasi

Karena interface hanya mendefinisikan signature saja, kita perlu membuat implementasinya.

Untuk membuat implementasi Box `interface`, yang perlu kita lakukan adalah membuat sebuah struct:

```go
type box struct {
	x, y int
}
```

Lalu menambahkan `method` yang signature-nya sama dengan apa yang telah didefinisikan di `interface`:

```go
func (b *box) Add() int {
	return b.x + b.y
}

func (b *box) Scale(s int) {
	b.x = b.x * s
	b.y = b.y * s
}
```

*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/-eeEFIzk4Xq)*

### Instance

Agar implementasi signature-signature di atas bisa digunakan, kita harus membuat `instance` dari struct tersebut.

Caranya: buat sebuah fungsi yang return value-nya bertipe `Box` interface.

```go
func NewBox(x int, y int) Box {
	return &box{x, y}
}
```

Kita menyebut fungsi tersebut `constructor`.

### Cara penggunaan

Untuk memanggil method-method yang sudah di-implementasi di atas, kita tinggal membuat instance menggunakan constructor. 

Setalah instance-nya telah dibuat, kita bisa langsung memanggil method-method-nya.

```go
func main() {
	box := NewBox(1, 2)
	box.Scale(2)
	result := box.Add()
	fmt.Println(result)
}
```

*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/LV9g64joB7X)*

