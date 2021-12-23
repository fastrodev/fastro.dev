---
title: "Mongodb"
date: 2021-12-19T05:00:47+07:00
authors: ["Admin"]
summary: "Cara setup koneksi ke mongodb dan membuat query sederhana"
draft: false
tags: [go,mongo]
categories: [golang-dasar]
---

MongoDB sering dipakai untuk membuat dan menyimpan data di golang. Catatan ini berisi penjelasan se-*simple* mungkin tentang cara setup koneksi ke mongoDB dan membuat query sederhana.

### Persiapan

Untuk bisa menyimpan data, harus kita siapkan dulu server mongodb-nya. Daftar *aja* secara gratis di [mongodb atlas](https://www.mongodb.com/cloud/atlas/register). 

- Ikuti saja [panduan resmi dari mongodb](https://docs.mongodb.com/drivers/go/current/quick-start/#create-a-mongodb-cluster) untuk membuat cluster, hingga mendapatkan uri ke database semacam ini: 

    ```
    mongodb+srv://admin:<password>@cluster0.xtwwu.mongodb.net
    ```
- Jangan lupa untuk [load sample dataset](https://docs.atlas.mongodb.com/sample-data/available-sample-datasets/).

### Awali app dengan go mod

Bikin folder dan inisialisasi proyek dengan `go mod`.

```
mkdir praktikum-mongodb
cd praktikum-mongodb
go mod init praktikum-mongodb
```

### Tambahkan mongodb driver

Gunakan `go get` untuk menambahkan driver mongodb di golang.
```
go get go.mongodb.org/mongo-driver/mongo
```

### Buat fungsi main
Buat fungsi `main` kosongan. Dan import driver mongodb.
```go
package main

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {}
```

### Buat dan putus koneksi
Di dalam fungsi main, tambahkan kode berikut:
```go
uri := "mongodb+srv://admin:admin@cluster0.u16np.mongodb.net"
client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
if err != nil {
    panic(err)
}
defer func() {
    if err := client.Disconnect(context.TODO()); err != nil {
        panic(err)
    }
}()
```
Pada kode di atas, kita membuat koneksi ke mongodb server dengan method `Connect`. 

Lalu kita memanggil `defer` agar ketika fungsi `main` selesai, koneksi ke mongodb diputus dengan method `Disconnect`.

> *Sebagai catatan: fungsi yang dideklarasikan setelah `defer` tidak akan dijalankan hingga fungsi utama selesai. Informasi lanjut bisa diakses di sini: [https://go.dev/tour/flowcontrol/12](https://go.dev/tour/flowcontrol/12)*

### Query ke database
Tambahkan kode berikut untuk membuat query sederhana.
```go
coll := client.Database("sample_mflix").Collection("movies")
title := "Back to the Future"
var result bson.M

err = coll.FindOne(context.TODO(), bson.D{{"title", title}}).Decode(&result)
if err == mongo.ErrNoDocuments {
    fmt.Printf("No document was found with the title %s\n", title)
    return
}
if err != nil {
    panic(err)
}

jsonData, err := json.MarshalIndent(result, "", "    ")
if err != nil {
    panic(err)
}

fmt.Printf("%s\n", jsonData)
```
*Kode lengkapnya: [lihat di sini](https://gist.github.com/ynwd/0d1454fd137ef6f8526f32ee84d35166)*

Pada kode di atas, kita membuat instance koleksi dari database `sample_mflix` dan koleksi `movies`. 

Kita lalu membuat query untuk mendapatkan data melalui method `FindOne` dengan  `bson.D{{"title", title}}` sebagai filternya.

Hasilnya kemudian diolah dengan method `MarshalIndent` agar bisa ditampilkan dalam bentuk json.

*Oya*, kita selalu menangkap dan mengolah variabel `err` agar setiap terjadi kesalahan, kita bisa tahu detailnya.

### Jalankan aplikasi
Pergi ke terminal dan jalankan aplikasi
```
go run main.go
```
Hasilnya seperti ini:
```
{
    "_id": "573a1398f29313caabce9682",
    "awards": {
        "nominations": 24,
        "text": "Won 1 Oscar. Another 18 wins \u0026 24 nominations.",
        "wins": 19
    },
    "cast": [
        "Michael J. Fox",
        "Christopher Lloyd",
        "Lea Thompson",
        "Crispin Glover"
    ],
    "countries": [
        "USA"
    ],
    "directors": [
        "Robert Zemeckis"
    ],
    "fullplot": "Marty McFly, a typical American teenager of the Eighties, is accidentally sent back to 1955 in a plutonium-powered DeLorean \"time machine\" invented by slightly mad scientist. During his often hysterical, always amazing trip back in time, Marty must make certain his teenage parents-to-be meet and fall in love - so he can get back to the future.",
    "genres": [
        "Adventure",
        "Comedy",
        "Sci-Fi"
    ],
    "imdb": {
        "id": 88763,
        "rating": 8.5,
        "votes": 636511
    },
    "languages": [
        "English"
    ],
    "lastupdated": "2015-09-12 00:29:36.890000000",
    "metacritic": 86,
    "num_mflix_comments": 0,
    "plot": "A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.",
    "poster": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_SX677_AL_.jpg",
    "rated": "PG",
    "released": "1985-07-03T07:00:00+07:00",
    "runtime": 116,
    "title": "Back to the Future",
    "type": "movie",
    "writers": [
        "Robert Zemeckis",
        "Bob Gale"
    ],
    "year": 1985
}
```

### Praktikum
Clone source code berikut [https://github.com/fastrodev/praktikum-mongodb](https://github.com/fastrodev/praktikum-mongodb):
```
git clone https://github.com/fastrodev/praktikum-mongodb.git .
```

Jalankan aplikasi [seperti di atas](#jalankan-aplikasi).







