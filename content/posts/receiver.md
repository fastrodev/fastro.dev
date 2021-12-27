---
title: "Receiver"
date: 2021-12-10
summary: "Memahami receiver di golang dan bagaimana cara menggunakannya"
authors: ["Admin"]
tags: [go]
categories: [programming]
series: [golang dasar]
---

Receiver sering sekali dipakai di golang. Catatan ini berisi penjelasan se-*simple* mungkin tentang `receiver` dan cara menggunakannya.

Tapi sebelum membahas `receiver`, kita akan singgung dulu hal yang sangat berkaitan: `function` dan `method`.

### Function

Ini adalah contoh sebuah fungsi di golang:

```go
func add(x int, y int) int {
	return x + y
}
```
*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/dIAgSYqy5vV).*

Fungsinya sangat sederhana: **hanya mengembalikan penjumlahan 2 integer.**

### Method

Method sebenarnya adalah sebuah [function](#function) juga. Hanya saja ia melekat pada sebuah struct. 

Berikut ini adalah contoh sebuah struct yang *ditempelin* oleh sebuah method `add()`.

```go
type box struct {
	x, y int
}

func (v box) add() int {
	return v.x + v.y
}
```

### Receiver

Receiver adalah argumen spesial yang digunakan sebuah struct untuk membuat fungsi agar melekat padanya. 

Tanpa ada receiver, tak ada method.

Lihat kode method di atas, perhatikan bagian ini:
```go
func (v box) add() int {
	return v.x + v.y
}
```

Dalam hal ini, `(v box)`, adalah receiver. 

Dan dengan adanya receiver, method-method dapat diakses dengan cara seperti ini:
```go
func main() {
	v := box{3, 4}
	result := v.add()
	fmt.Println(result)
}
```

*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/hiRzW4gE3E7).*

### Pointer receivers

Seperti telah kita ketahui, pointer dapat kita gunakan untuk mengakses alamat suatu variabel. 

Apa yang terjadi jika pointer kita gunakan untuk receiver?

```go
type box struct {
	x, y int
}

func (v *box) add() int {
	return v.x + v.y
}
```
*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/38KXB4st4QI).*

Ternyata tidak ada yang terjadi.

Mari tambahkan satu fungsi yang bertujuan untuk mengubah variabel di dalam struct. 

*Kita tidak pakai pointer dulu, ya. Biar tahu apa bedanya.*
```go
type box struct {
	x, y int
}

func (v box) add() int {
	return v.x + v.y
}

func (v box) scale(s int) {
	v.x = v.x * s
	v.y = v.y * s
}
```

*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/2LgXSApzdeA).*

Ternyata tidak ada yang terjadi. Variabel x dan y dalam fungsi scale hanya menerima copi-an datanya saja. Nilai variabel dalam struct-nya sendiri tidak berubah.

Mari kita ganti spesial argumen di atas menggunakan pointer.

```go
type box struct {
	x, y int
}

func (v *box) add() int {
	return v.x + v.y
}

func (v *box) scale(s int) {
	v.x = v.x * s
	v.y = v.y * s
}
```
*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/7JAl5MVaAh2).*

Ternyata hasilnya berubah. Variabel x dan y dalam pointer telah sukses diganti oleh method `scale`. 

Hal itu bisa terjadi karena yang diakses method tersebut adalah alamat variabel-variabel x dan y. 

Sehingga saat alamat-alamat tersebut dikalikan 2, data-data di alamat tersebut akan ikut berubah.

