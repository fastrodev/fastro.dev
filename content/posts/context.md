---
title: "Context with timeout"
date: 2021-12-26
authors: ["Admin"]
summary: "Memahami context.WithTimeout di golang dan cara menggunakannya."
draft: false
tags: [go]
categories: [programming]
series: [golang dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang `context.WithTimeout` di golang dan cara menggunakannya.

### Pendahuluan

Pada catatan [sebelumnya](/posts/repository): 
- saat injeksi client di method [`createBookRepository`](https://github.com/fastrodev/praktikum-repository/blob/2c985f11a3aa23d807b9693206f741dbfe3bb8aa/main.go#L20)
- saat pemanggilan collection di [setiap method](https://github.com/fastrodev/praktikum-repository/blob/2c985f11a3aa23d807b9693206f741dbfe3bb8aa/main.go#L33).

Ada satu argumen yang selalu kita isi dengan `context.TODO()`. Kalau kita teliti lagi, tipe argumen ini adalah `context.Context`.

Yang jadi pertanyaan: apa *sih* gunanya?

### Simulasi

Dalam keadaan normal, internet stabil, jaringan bagus -- penggunaan `Context` seperti di atas tak ada masalah. Kembalian dari tiap method sudah berjalan seperti yang diharapkan. 

Namun bayangkan, jika koneksi internet tiba-tiba terganggu dan kita perlu melakukan pembatalan query (transaksi) karena itu.

Agar lebih memahami cara kerjanya, kita akan buat satu fungsi untuk membuat simulasinya.

Fungsi ini punya 2 argumen. Argumen ke-1 menerima `Context`. Sedangkan argumen ke-2 menerima `Duration`.
```go
func task(ctx context.Context, taskTime time.Duration) {
	str := ""
	select {
	case <-ctx.Done():
		str = `Aduh, udah timeout! padahal belum kelar.`
		fmt.Println(str)
	case <-time.After(taskTime):
		str = `Yes, mantap! kerjaan kelar.`
		fmt.Println(str)
	}
}
```

Argumen ke-1 digunakan untuk simulasi `timeout`. Sedang argumen ke-2 untuk simulasi berapa lama waktu yang diperlukan untuk menyelesaikan task tsb.

> *Kode di atas menggunakan channel. Info selengkapnya bisa diakses di sini: [https://go.dev/tour/concurrency/2](https://go.dev/tour/concurrency/2)*

### Pekerjaan belum selesai, tapi sudah timeout
```go
func main() {
	fmt.Println(`Contoh: kerjaan belum selesai tapi sudah timeout:`)

	durasiKerjaan := 3 * time.Second // 3 detik
	timeout := time.Second           // 1 detik

	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	task(ctx, durasiKerjaan)
}
```
*Kode selengkapnya: [lihat di sini](https://go.dev/play/p/impUqbQpB7r)*

Pada kode di atas, durasi task adalah 3 detik. Tapi timeout-nya lebih cepat. 

Sehingga jika kode di atas kita jalankan, hasilnya:
```
Contoh: kerjaan belum selesai tapi sudah timeout:
Aduh, udah timeout! padahal belum kelar.
```

### Pekerjaan sudah selesai duluan sebelum timeout
```go
func main() {
	fmt.Println(`Contoh: kerjaan sudah selesai duluan`)

	durasiKerjaan := time.Second // 1 detik
	timeout := 3 * time.Second   // 3 detik

	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	task(ctx, durasiKerjaan)
}
```
*Kode selengkapnya: [lihat di sini](https://go.dev/play/p/WUbpaz5pRZq)*

Pada kode di atas, durasi kerjaan 1 detik. Sedangkan timeout 3 detik. 

Sehingga jika kita jalankan, hasilnya:
```
Contoh: kerjaan sudah selesai duluan
Yes, mantap! kerjaan kelar.
```
### Kesimpulan

Kita bisa menggunakan `context.WithTimeout` jika ingin menambahkan pembatalan sebuah pekerjaan jika durasinya melebihi `timeout`. 