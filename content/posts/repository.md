---
title: "Repository"
date: 2021-12-22
authors: ["Admin"]
summary: "Cara membuat mongodb crud (create read update delete) di golang dengan repository"
draft: false
tags: [go,mongo]
categories: [golang-dasar]
---

Catatan ini berisi penjelasan se-*simple* mungkin tentang cara membuat CRUD di mongodb dengan repository.

Jika [sebelumnya](/posts/mongodb) kita membuat koneksi dan query ke database dalam satu fungsi `main`, pada catatan ini kita akan melakukan beberapa refaktor:
- model untuk definisi data
- repository untuk akses data
- main untuk pemanggilan method

### Membuat model
Kita akan menyimpan data dengan struktur seperti ini:
```go
type Book struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Title  string             `bson:"title,omitempty"`
	Author string             `bson:"author,omitempty"`
	Year   int                `bson:"year_published,omitempty"`
}
```
Pada kode di atas, kita menggunakan anotasi bson.
> *Info lanjut mengenai anotasi bson, bisa dilihat di sini: [https://www.mongodb.com/blog/post/quick-start-golang--mongodb--modeling-documents-with-go-data-structures](https://www.mongodb.com/blog/post/quick-start-golang--mongodb--modeling-documents-with-go-data-structures)*

### Membuat repository
Repository ini nanti akan kita *tempelin* fungsi-fungsi crud.
```go
type repository struct {
	coll *mongo.Collection
}
```

### CRUD method
Berikut ini adalah detail fungsi-fungsi CRUD yang menempel pada repository
```go

func (r *repository) createBook(book Book) (*mongo.InsertOneResult, error) {
	return r.coll.InsertOne(context.TODO(), book)
}

func (r *repository) readBook(id interface{}) ([]byte, error) {
	var result bson.M
	filter := bson.M{"_id": id}
	err := r.coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	jsonData, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		return nil, err
	}
	return jsonData, nil
}

func (r *repository) updateBook(id interface{}, book Book) (*mongo.UpdateResult, error) {
	filter := bson.M{"_id": id}
	update := bson.M{"$set": book}
	return r.coll.UpdateOne(context.TODO(), filter, update)
}

func (r *repository) deleteBook(id interface{}) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": id}
	return r.coll.DeleteMany(context.TODO(), filter)
}
```

### Repository instance
Setelah itu, bikin satu fungsi untuk membuat instance repository:
```go
func createBookRepository(uri, db, col string) *repository {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	return &repository{coll: client.Database(db).Collection(col)}
}
```
Pada kode di atas, property koleksi `coll` kita inject dengan instance `client` yang terhubung dengan server `uri`, database `db`, dan koleksi data `col`.

Variabel-variabel diatas akan kita isi dari fungsi `main`.

### Penggunaan repository
Setelah repository kita buat, kita tinggal panggil method-method yang dibutuhkan.
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
	fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)
}
```
*Kode selengkapnya: [lihat di sini](https://github.com/fastrodev/praktikum-repository/blob/main/main.go)*

### Jalankan aplikasi
```
go run main.go
```
Hasilnya:
```shell
Inserted document with _id: ObjectID("61c2a3725e07b8c3ffb1e832")
```

### Praktikum
Clone source code berikut [https://github.com/fastrodev/praktikum-repository](https://github.com/fastrodev/praktikum-repository):
```shell
git clone https://github.com/fastrodev/praktikum-repository .
```

Download modul-modul
```
go mod tidy
```

Jalankan aplikasi [seperti di atas](#jalankan-aplikasi).
