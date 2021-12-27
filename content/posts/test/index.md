---
title: "Test"
date: 2021-12-27
authors: ["Admin"]
summary: "Memahami cara test di golang dan cara menggunakannya di mongodb"
draft: true
tags: [go]
categories: [programming]
---

Catatan ini berisi penjelasan *se-simple* mungkin tentang cara testing di golang cara menggunakannya di mongodb.

### Pendahuluan

Pada [catatan sebelumnya](/posts/cancel) kita telah menggunakan context dan cancel di mongodb. Pada tulisan kali ini kita akan membahas bagaimana cara melakukan testing di mongodb.

### Test createBookRepository
1. Buka source-code dengan vs-code. 
2. Arahkan pointer di atas fungsi `createBookRepository`. 
3. Klik kanan, lalu pilih `Go: Generate Unit Tests This Function`
    ![](pop.png)
4. Jika ok, nanti akan muncul file baru: `main_test.go`
    ```go
    package main

    import (
        "context"
        "reflect"
        "testing"
        "time"
    )

    func Test_createBookRepository(t *testing.T) {
        type args struct {
            ctx     context.Context
            timeout time.Duration
            uri     string
            db      string
            col     string
        }
        tests := []struct {
            name string
            args args
            want *repository
        }{
            {
                name: "
            },
        }
        for _, tt := range tests {
            t.Run(tt.name, func(t *testing.T) {
                if got := createBookRepository(tt.args.ctx, tt.args.timeout, tt.args.uri, tt.args.db, tt.args.col); !reflect.DeepEqual(got, tt.want) {
                    t.Errorf("createBookRepository() = %v, want %v", got, tt.want)
                }
            })
        }
    }
    ```
5. Ganti `// TODO: Add test cases.` dengan input dan output yang kita inginkan.
    ```go

    ```