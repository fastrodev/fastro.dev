---
title: "[SOLID] Single Responsibility Principle"
date: 2022-02-01
authors: ["Admin"]
summary: "Memahami Single Responsibility Principle (SRP) dan penerapannya di golang"
draft: false
tags: [go]
categories: [programming]
series: [solid]
---

Gampangnya, setiap modul harus menangani tugas yang spesifik, tidak boleh dicampur dengan tugas-tugas yang lain.

Berikut ini adalah contoh sebuah fungsi yang terdiri dari 3 macam tugas berbeda sekaligus:
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
	price := hitungHargaTanah(100, 10, 10)
	fmt.Println(price)
}
```

Setelah kita terapkan prinsip single-responsbility, maka setiap tugas spesifik di atas harus ditangani oleh satu fungsi spesifik pula. Tidak dicampur.

```go
package main

import (
	"fmt"

	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"golang.org/x/text/message"
	"golang.org/x/text/number"
)

type luas struct{}

func (l *luas) hitungLuasTanah(panjang, lebar int) int {
	return panjang * lebar
}

type harga struct{}

func (h *harga) hitungHargaTanah(harga, luas int) int {
	return harga * luas
}

type text struct{}

func (t *text) string(harga int) string {
	cur := currency.MustParseISO("IDR")
	scale, _ := currency.Cash.Rounding(cur)
	dec := number.Decimal(harga, number.Scale(scale))
	p := message.NewPrinter(language.Indonesian)
	return p.Sprintf("%v%v", currency.Symbol(cur), dec)
}

func main() {
	l := luas{}
	luasTanah := l.hitungLuasTanah(100, 10)

	h := harga{}
	hargaTanah := h.hitungHargaTanah(100, luasTanah)

	t := text{}
	fmt.Println(t.string(hargaTanah))
}
```