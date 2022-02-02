---
title: "Single Responsibility Principle"
date: 2022-02-01
authors: ["Admin"]
summary: "Memahami Single Responsibility Principle (SRP) dan penerapannya di golang"
draft: false
tags: [go]
categories: [programming]
series: [solid]
---

Gampangnya, setiap modul harus menangani tugas yang spesifik, tidak boleh dicampur dengan tugas-tugas yang lain.

Berikut ini adalah contoh sebuah fungsi `hitungHargaTanah` yang terdiri dari 3 macam tugas berbeda sekaligus:
1. menghitung luas
2. menghitung harga total
3. menampilkan harga dalam mata uang rupiah

```go
package main

import (
	"fmt"

	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"golang.org/x/text/message"
	"golang.org/x/text/number"
)

func hitungHargaTanah(harga, panjang, lebar int) string {
	// hitung luas
	luas := panjang * lebar

	// hitung harga total
	totalPrice := harga * luas

	// format mata uang
	cur := currency.MustParseISO("IDR")
	scale, _ := currency.Cash.Rounding(cur)
	dec := number.Decimal(totalPrice, number.Scale(scale))
	p := message.NewPrinter(language.Indonesian)

	return p.Sprintf("%v%v", currency.Symbol(cur), dec)
}

func main() {
	hargaPerMeter := 10000
	panjang := 100
	lebar := 10

	harga := hitungHargaTanah(hargaPerMeter, panjang, lebar)

	fmt.Println("harga:", harga)
}
```

Setelah kita terapkan prinsip single-responsbility, maka setiap tugas spesifik di atas harus ditangani oleh satu fungsi spesifik pula. Tidak dicampur.

Berikut ini adalah contohnya:

1. `hitungLuasTanah`
2. `hitungHarga`
3. `text`

```go
package main

import (
	"fmt"

	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"golang.org/x/text/message"
	"golang.org/x/text/number"
)

func hitungLuasTanah(panjang, lebar int) int {
	return panjang * lebar
}

func hitungHarga(harga, luas int) int {
	return harga * luas
}

func text(harga int) string {
	cur := currency.MustParseISO("IDR")
	scale, _ := currency.Cash.Rounding(cur)
	dec := number.Decimal(harga, number.Scale(scale))
	p := message.NewPrinter(language.Indonesian)
	return p.Sprintf("%v%v", currency.Symbol(cur), dec)
}

func hitungHargaTanah(harga, panjang, lebar int) string {
	luas := hitungLuasTanah(panjang, lebar)
	hargaTotal := hitungHarga(harga, luas)
	return text(hargaTotal)
}

func main() {
	hargaPerMeter := 10000
	panjang := 100
	lebar := 10

	harga := hitungHargaTanah(hargaPerMeter, panjang, lebar)

	fmt.Println("harga:", harga)
}
```

Dengan cara ini, tiap tugas bisa kita buatkan unit test-nya. Dan jika ada perubahan pada salah satu fungsi, sepanjang signature-nya masih sama, maka tidak akan mempengaruhi fungsi yang lain.