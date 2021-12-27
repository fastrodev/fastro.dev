---
title: "Cancel"
date: 2021-12-27
authors: ["Admin"]
summary: "Memahami cara melakukan pembatalan menggunakan context.WithTimeout di mongodb"
draft: false
tags: [go,mongodb]
categories: [programming]
series: [golang dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang cara pembatalan *(cancel)* menggunakan `context.WithTimeout` di mongodb.

### Pendahuluan

Pada [catatan sebelumnya](/posts/context/), kita telah membuat simulasi penerapan `context.WithTimeout` secara sederhana untuk mengetahui cara kerjanya. Kali ini kita akan menerapkannya di mongodb.

### Ubah repository
```go
type repository struct {
	coll    *mongo.Collection
	timeout time.Duration
}
```
Kita tambahkan `timeout` agar bisa diakses di setiap method. Ini dilakukan agar tidak terjadi pengulangan deklarasi di setiap method.

### Ubah instance repository
```go
func createBookRepository(
	ctx context.Context,
	timeout time.Duration,
	uri, db, col string,
) *repository {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	return &repository{
		coll:    client.Database(db).Collection(col),
		timeout: timeout,
	}
}
```
Kita tambahkan argument baru untuk `timeout`. Argumen baru ini kita gunakan untuk inisialisasi `ctx` dan injeksi struct `repository`. 

### Masukkan context dan panggil cancel di setiap method
```go
func (r *repository) createBook(ctx context.Context, book Book) (*Book, error) {
	ctx, cancel := context.WithTimeout(ctx, r.timeout)
	defer cancel()

	res, err := r.coll.InsertOne(ctx, book)
	if err != nil {
		return nil, err
	}

	book.ID = res.InsertedID.(primitive.ObjectID)
	return &book, nil
}
```
Perhatikan, kita telah buat inisialiasi `context.WithTimeout` menggunakan `timeout` yang telah kita injeksi melalui `repository`.

### Cara pemakaian
Setelah signature fungsi dan method telah diubah, cara pemanggilannya juga perlu kita sesuaikan lagi: 
```go
func main() {
	uri := "mongodb+srv://admin:admin@cluster0.xtwwu.mongodb.net"
	database := "myDB"
	collection := "favorite_books"
	ctx := context.Background()
	timeout := 10 * time.Second
	repo := createBookRepository(ctx, timeout, uri, database, collection)

	result, err := repo.createBook(
		ctx,
		Book{
			Title:  "Invisible Cities",
			Author: "Italo Calvino",
			Year:   1974,
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Inserted document with _id: %v\n", result.ID)
}
```
*Kode selengkapnya: [lihat di sini](https://github.com/fastrodev/praktikum-repository/blob/cancel/main.go)*

Perhatikan bahwa inisialisasi `context` dan `timeout` cukup dilakukan sekali. Dan ia digunakan oleh semua fungsi dan method.

Jika kita jalankan, hasilnya:
```
Inserted document with _id: ObjectID("61c8f92ba3e486cbdc3ee68b")
```