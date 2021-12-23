---
title: "Marshal"
date: 2021-12-23
authors: ["Admin"]
summary: "Memahami marshal dan unmarshal di golang dan cara menggunakannya di mongodb"
draft: false
tags: [go,mongo]
categories: [golang-dasar]
---

`Marshal` dan `Unmarshal` sering dipakai untuk mengolah data di golang. Catatan ini berisi penjelasan se-*simple* mungkin tentang marshal-unmarshal dan cara menggunakannya di mongodb.

### Pendahuluan
Pada [catatan sebelumnya](/posts/repository) kita telah membuat crud. Kalau kita jalankan hasilnya, return dari method [`readBook`](https://github.com/fastrodev/praktikum-repository/blob/2c985f11a3aa23d807b9693206f741dbfe3bb8aa/main.go#L36) masih seperti ini:

```
&{<nil> 0xc00040e180 [] 0xc00013abd0}
```
Karena return valuenya masih berupa pointer, yang tampil adalah alamat memori data itu berada.

Yang jadi pertanyaan: bagaimana cara kita menampilkan data yang lebih bisa dibaca *(readable)*?

### Ubah signature
Format return value yang menurut kita ideal adalah struct. Karena dengan struct, akan dengan mudah diubah ke format lain.

```go
func (r *repository) readBook(id interface{}) (*Book, error) {
    return nil, nil
}
```
Perhatikan, return valuenya berupa pointer struct agar yang diakses nanti adalah alamatnya.

### Tambahkan query dan decode
Kita tambahkan method `Decode` yang akan menyimpan hasilnya di variabel `result`. 

Ingat, variabel ini bertipe `bson.D` agar bisa kita proses dengan fungsi `Marshal`.

```go
func (r *repository) readBook(id interface{}) (*Book, error) {
    filter := bson.M{"_id": id}
	var result bson.D
	err := r.coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
    fmt.Println(result)
    return nil, nil
}
```
Ada juga fungsi `Println` untuk menampilkan hasil method `Decode`. Jika kita jalankan, hasilnya kurang lebih seperti ini:
```
[{_id ObjectID("61c3b3e004b93f7df512035c")} {title Invisible Cities} {author Italo Calvino} {year_published 1974}]
```
### Marshal
Variabel `result` masih berbentuk bson. Sudah bisa dibaca, sih. Tapi formatnya masih belum sesuai dengan signature yang sudah kita tentukan.

Marshal, berguna *banget* untuk mengubah `result` menjadi data yang bertipe `byte[]`. Tipe data terakhir inilah yang nantinya bisa diubah lagi menjadi struct.

```go
func (r *repository) readBook(id interface{}) (*Book, error) {
    filter := bson.M{"_id": id}
	var result bson.D
	err := r.coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
    
    docByte, err := bson.Marshal(result)
	if err != nil {
		return nil, err
	}

    fmt.Println(docByte)
    
    return nil, nil
}
```
Jika kita jalankan, `docByte` akan tampil seperti ini:
```
[100 0 0 0 7 95 105 100 0 97 195 183 184 108 56 136 31 173 218 187 131 2 116 105 116 108 101 0 13 0 0 0 66 117 109 105 32 109 97 110 117 115 105 97 0 2 97 117 116 104 111 114 0 22 0 0 0 80 114 97 109 111 101 100 121 97 32 65 110 97 110 116 97 32 84 111 101 114 0 16 121 101 97 114 95 112 117 98 108 105 115 104 101 100 0 188 7 0 0 0]
```
### Unmarshal
Setelah menjadi `[]byte`, variabel `docByte` akan kita ubah menjadi struct `Book`. Fungsi yang berguna untuk tujuan itu adalah `Unmarshal`.
```go
func (r *repository) readBook(id interface{}) (*Book, error) {
	filter := bson.M{"_id": id}
	var result bson.D
	err := r.coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}

	docByte, err := bson.Marshal(result)
	if err != nil {
		return nil, err
	}

	var book Book
	err = bson.Unmarshal(docByte, &book)
	if err != nil {
		return nil, err
	}

    fmt.Println(book)

	return &book, nil
}
```
Kalau kita jalankan, fungsi `Println` di atas hasilnya akan seperti ini:
```
{ObjectID("61c3b92981219573cfb48119") Invisible Cities Italo Calvino 1974}
```
### Cara pemakaian

Setelah signature telah kita ganti, cara pemakaian repository di fungsi `main` perlu kita sesuaikan.

```go
func main() {
	uri := "mongodb+srv://admin:admin@cluster0.xtwwu.mongodb.net"
	database := "myDB"
	collection := "favorite_books"
	repo := createBookRepository(uri, database, collection)

	result, err := repo.createBook(Book{
		Title:  "Invisible Cities",
		Author: "Italo Calvino",
		Year:   1974,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("Inserted document with _id: %v\n", result.ID)

    book, err := repo.readBook(result.ID)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v\n", *book)
}
```
*Kode selengkapnya: [lihat di sini](https://github.com/fastrodev/praktikum-repository/blob/marshal/main.go)*

Kalau kita jalankan, hasilnya jadi seperti ini:
```
Inserted document with _id: ObjectID("61c3da9bf49dd8380bb17ca0")
{ObjectID("61c3da9bf49dd8380bb17ca0") Invisible Cities Italo Calvino 1974}
```







