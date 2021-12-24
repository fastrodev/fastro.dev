---
title: "Context"
date: 2021-12-24
authors: ["Admin"]
summary: "Memahami context di golang dan cara menggunakannya di mongodb"
draft: true
tags: [go,mongo]
categories: [programming]
series: [golang dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang `context` di golang dan cara menggunakannya di mongodb.

### Pendahuluan

Pada catatan [sebelumnya](/posts/repository): 
- saat injeksi client di method [`createBookRepository`](https://github.com/fastrodev/praktikum-repository/blob/2c985f11a3aa23d807b9693206f741dbfe3bb8aa/main.go#L20)
- saat pemanggilan collection di [setiap method](https://github.com/fastrodev/praktikum-repository/blob/2c985f11a3aa23d807b9693206f741dbfe3bb8aa/main.go#L33).

Ada satu argumen yang selalu kita isi dengan `context.TODO()`. Kalau kita teliti lagi, tipe argumen ini adalah `context.Context`.

Yang jadi pertanyaan: apa *sih* gunanya?

### Context

Dalam keadaan normal, penggunaan `Context` seperti sebelumnya tidak ada masalah. Kembalian dari tiap method sudah berjalan seperti yang diharapkan. 

Namun bayangkan, jika koneksi internet ternyata tiba-tiba terganggu dan aplikasi kita butuh untuk melakukan pembatalan query (transaksi) jika koneksi tidak terjadi juga dalam beberapa detik.