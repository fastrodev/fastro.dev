---
title: "Test"
date: 2021-12-27
authors: ["Admin"]
summary: "Memahami cara test di golang dan cara menggunakannya di mongodb"
draft: false
tags: [go]
categories: [programming]
---

Catatan ini berisi penjelasan *se-simple* mungkin tentang cara testing di golang cara menggunakannya di mongodb.

### Pendahuluan

Pada [catatan sebelumnya](/posts/cancel) kita telah menggunakan context dan cancel di mongodb. Pada tulisan kali ini kita akan membahas bagaimana cara melakukan testing di mongodb.

### Persiapan

1. Install [vs-code](https://code.visualstudio.com/).
2. Install [golang extension](https://marketplace.visualstudio.com/items?itemName=golang.go)

### Refactor createBookRepository
Kita akan sedikit melakukan perubahan pada fungsi `createBookRepository` agar instance dari collection bisa kita generate dari luar fungsi.

```go
func createBookRepository(
    collection *mongo.Collection,
    timeout time.Duration,
) *repository {
    return &repository{
        collection: collection,
        timeout:    timeout,
    }
}
```
Jika sebelumnya `collection` kita buat di dalam fungsi, kali ini kita pindahkan dia ke dalam fungsi terpisah.
```go
func createCollection(
    ctx context.Context,
    timeout time.Duration,
    uri, db, col string,
) (*mongo.Collection, error) {
    ctx, cancel := context.WithTimeout(ctx, timeout)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
    if err != nil {
        return nil, err
    }
    return client.Database(db).Collection(col), nil
}
```
*Kode selengkapnya: [bisa diakses di sini](https://github.com/fastrodev/praktikum-repository/blob/f1e0933fa47cb725aefd0499093fa560ab7c4a69/main.go#L31)*

Ini kita lakukan agar kita bisa membuat simulasi koneksi database yang berhasil dan gagal. Simulasi sukses dan gagal tersebut akan kita gunakan ketika testing.

### Test createBookRepository
1. Buka source-code dengan vs-code.
2. Arahkan pointer di atas fungsi `createBookRepository`. 
3. Klik kanan, lalu pilih `Go: Generate Unit Tests This Function`
    ![](pop.png)
4. Jika ok, nanti akan muncul file baru: `main_test.go`
    ```go
    func Test_createBookRepository(t *testing.T) {
        type args struct {
            collection *mongo.Collection
            timeout    time.Duration
        }
        tests := []struct {
            name string
            args args
            want *repository
        }{
            // TODO: Add test cases.
        }
        for _, tt := range tests {
            t.Run(tt.name, func(t *testing.T) {
                if got := createBookRepository(tt.args.collection, tt.args.timeout); !reflect.DeepEqual(got, tt.want) {
                    t.Errorf("createBookRepository() = %v, want %v", got, tt.want)
                }
            })
        }
    }
    ```
5. Ganti `// TODO: Add test cases.` dengan input dan output yang kita inginkan. Jika sukses harapannya apa. Jika gagal harapannya apa.
    ```go
    {
        name: "success create repository",
        args: args{
            collection: successCollection,
            timeout:    timeout,
        },
        want: &repository{
            collection: successCollection,
            timeout:    timeout,
        },
    },
    {
        name: "fail create collection",
        args: args{
            collection: errCollection,
            timeout:    timeout,
        },
        want: &repository{
            collection: errCollection,
            timeout:    timeout,
        },
    },
    ```
    *Kode selengkapnya: [bisa diakses di sini](https://github.com/fastrodev/praktikum-repository/blob/test/main_test.go)*

### Cara testing
Buka terminal dan ketik command berikut:
```
go test -run Test_createBookRepository -v
```
Perhatikan bahwa `Test_createBookRepository` adalah nama testing.

Jika kita jalankan command di atas, hasilnya:
```
=== RUN   Test_createBookRepository
=== RUN   Test_createBookRepository/success_create_repository
=== RUN   Test_createBookRepository/fail_create_collection
--- PASS: Test_createBookRepository (0.06s)
    --- PASS: Test_createBookRepository/success_create_repository (0.00s)
    --- PASS: Test_createBookRepository/fail_create_collection (0.00s)
PASS
ok      praktikum-crud  0.262s
```

### Test semua code
Langkah-langkah di atas adalah untuk test individual untuk masing-masing fungsi. 
Bayangkan tiap fungsi di atas kita telah buatkan unit-test-nya.

Cara untuk melakukannya adalah:
```
go test ./... -v
```
Hasilnya:
```
=== RUN   Test_createBookRepository
=== RUN   Test_createBookRepository/success_create_repository
=== RUN   Test_createBookRepository/fail_create_collection
--- PASS: Test_createBookRepository (10.11s)
    --- PASS: Test_createBookRepository/success_create_repository (0.00s)
    --- PASS: Test_createBookRepository/fail_create_collection (0.00s)
=== RUN   Test_repository_createBook
=== RUN   Test_repository_createBook/empty_book
=== RUN   Test_repository_createBook/success_create
=== RUN   Test_repository_createBook/context_deadline_exceeded
--- PASS: Test_repository_createBook (10.74s)
    --- PASS: Test_repository_createBook/empty_book (0.58s)
    --- PASS: Test_repository_createBook/success_create (0.06s)
    --- PASS: Test_repository_createBook/context_deadline_exceeded (0.00s)
=== RUN   Test_repository_readBook
=== RUN   Test_repository_readBook/success
=== RUN   Test_repository_readBook/fail
--- PASS: Test_repository_readBook (0.07s)
    --- PASS: Test_repository_readBook/success (0.03s)
    --- PASS: Test_repository_readBook/fail (0.04s)
=== RUN   Test_repository_updateBook
=== RUN   Test_repository_updateBook/success
=== RUN   Test_repository_updateBook/fail
--- PASS: Test_repository_updateBook (0.05s)
    --- PASS: Test_repository_updateBook/success (0.05s)
    --- PASS: Test_repository_updateBook/fail (0.00s)
=== RUN   Test_repository_deleteBook
=== RUN   Test_repository_deleteBook/success
--- PASS: Test_repository_deleteBook (0.05s)
    --- PASS: Test_repository_deleteBook/success (0.05s)
PASS
ok      praktikum-crud  21.221s
```

### Coverage test

Yang menarik, go juga menyediakan tool untuk mengetahui, seberapa banyak fungsi-fungsi yang telah kita buat, telah tercakup oleh test(coverage).

Cara untuk melakukannya adalah:
```
go test -coverprofile=cov ./...
```
Hasilnya:
```
ok      praktikum-crud  21.768s coverage: 95.1% of statements
```
