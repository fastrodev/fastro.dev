---
title: "Pointer"
date: 2021-12-08T04:56:27+07:00
summary: "Memahami pointer di golang dan bagaimana cara menggunakannya"
authors: ["Admin"]
tags: [go]
categories: [golang-dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang pointer, cara penggunaan, dan tampilan visual untuk memudahkan penggambaran di otak. 

Lihat variabel-variable di kode berikut:
```go
package main

import "fmt"

type People struct {
	Name string
	Age  int
}

func main() {
	var age int = 4
	var name string = "pram"
	var people = People{"Pram", 4}
}
```


Untuk menggunakan variabel, kita tinggal memanggil saja namanya.

Contoh:
```go
fmt.Println(age)
fmt.Println(name)
fmt.Println(people.Age)
fmt.Println(people.Name)
```

Sebenarnya, setiap variable yang  ditulis diatas, oleh komputer disimpan di memori dengan alamat tertentu. 

Lihat gambar berikut:

![](https://gist.githubusercontent.com/ynwd/fd867c9b4b92f557440d25b795e71f8c/raw/fe3fc26144da6c34a9ca1623ae9eeb5046c427cb/pointer-Page-1.svg)

Variable `age` di address `0xc000018030`  
Variable `name` di address `0xc000010230`  
Variable `people` di address `0xc00000c030`  


**Yang jadi pertanyaan**:  
- Bagaimana cara kita mendapatkan `address` variabel-variabel tersebut?

### Cara mendapatkan address
Gampang. Tambahkan saja simbol `&` (*address operator*) sebelum nama variabel.

Lihat kode berikut:
```go
fmt.Println(&age)
fmt.Println(&name)
fmt.Printf("%p\n", &people)
```

**Yang jadi pertanyaan**:
- Bagaimana cara kita menyimpan address?

### Tipe data untuk menyimpan address
Nah, inilah kegunaan `pointer`: tipe data yang digunakan untuk penyimpanan address dalam sebuah variabel.  

Cara deklarasinya cukup menambahkan simbol `*` sebelum tipe data.

Lihat kode berikut:

```go
var agePointer *int
var namePointer *string
var peoplePointer *People

agePointer = &age
namePointer = &name
peoplePointer = &people
```

Karena kecerdasan Golang, kode diatas bisa dipersingkat dengan cara berikut:

```go
agePointer := &age
namePointer := &name
peoplePointer := &people
```

Jika langsung memanggil variabel-variabel pointer tersebut, yang kita dapatkan adalah `memory address`.

Perhatikan kode berikut:
```go
fmt.Println(agePointer)
fmt.Println(namePointer)
fmt.Printf("%p\n", peoplePointer)
```

Hasilnya kurang lebih seperti ini:
```
0xc000018030
0xc000010230
0xc00000c030
```

Lihat gambar berikut untuk mengetahui secara visual apa yang terjadi di memori:

![](https://gist.githubusercontent.com/ynwd/fd867c9b4b92f557440d25b795e71f8c/raw/2ba5ac238a7ab59b72602c835fe669eec053e15b/pointer-Page-3.svg)


### Mendapatkan data dengan pointer
Yang menarik adalah, kita bisa mendapatkan data "asal" hanya dengan menambahkan symbol `*` di depan nama variabel tersebut.

Lihat kode berikut:
```go
fmt.Println(*agePointer)
fmt.Println(*namePointer)
fmt.Println(*peoplePointer)
```

Hasilnya:
```
4
pram
{Pram 4}
```

Lihat gambar berikut:

![](https://gist.githubusercontent.com/ynwd/fd867c9b4b92f557440d25b795e71f8c/raw/fe3fc26144da6c34a9ca1623ae9eeb5046c427cb/pointer-Page-2.svg)

*Kode lengkapnya: [lihat di sini](https://go.dev/play/p/I8jd-gxbiw1)*

### Kegunaan pointer

Lihat kode berikut:

```go
var people1 People
var people2 People
var people3 People

people1 = People{"pram",4}
people2 = people1
people3 = people2

fmt.Println(people3)
```

Di golang, secara default, pengkopian dilakukan secara *passed by value*. Oleh karena itu, semua variabel diatas akan dibuatkan space dan alamatnya di memori.

Bayangkan ada ribuan variabel seperti people, akan seperti apa kondisi memorinya? Tentu akan cepat penuh, bukan? Ini akan berakibat lambatnya pemrosesan.

Nah, karena pointer hanya menyimpan alamat memori, tentu saja ruang yang dipakai untuk menyimpan data tetap minimal.

### Kredit dan referensi:
[Golang Basics - Pointers](https://codetree.dev/golang-basics/pointers/) oleh Soham Kamani
