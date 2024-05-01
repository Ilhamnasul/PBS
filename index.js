const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config.js');
const response = require('./request.js');

app.use(bodyParser.json());

// GET endpoint untuk mendapatkan data penerbit
app.get('/', (req, res) => {
    const sqlPenerbit = 'SELECT * FROM Penerbit';
    const sqlPenulis = 'SELECT * FROM Penulis';
    const sqlBuku = 'SELECT * FROM Buku';
    const sqlPelanggan = 'SELECT * FROM Pelanggan';
    const sqlPembelian = 'SELECT * FROM Pembelian';

    db.query(sqlPenerbit, (errorPenerbit, resultPenerbit) => {
        db.query(sqlPenulis, (errorPenulis, resultPenulis) => {
            db.query(sqlBuku, (errorBuku, resultBuku) => {
                db.query(sqlPelanggan, (errorPelanggan, resultPelanggan) => {
                    db.query(sqlPembelian, (errorPembelian, resultPembelian) => {
                        if (errorPenerbit || errorPenulis || errorBuku || errorPelanggan || errorPembelian) {
                            response(500, 'error', 'Gagal mengambil data dari tabel', res);
                        } else {
                            const data = {
                                penerbit: resultPenerbit,
                                penulis: resultPenulis,
                                buku: resultBuku,
                                pelanggan: resultPelanggan,
                                pembelian: resultPembelian
                            };
                            response(200, data, 'Data dari semua tabel', res);
                        }
                    });
                });
            });
        });
    });
});

app.get('/penerbit', (req, res) => {
    const sql = 'SELECT * FROM Penerbit';
    db.query(sql, (error, result) => {
        response(200, result, 'Data penerbit', res);
    });
});

// GET endpoint untuk mendapatkan data penulis
app.get('/penulis', (req, res) => {
    const sql = 'SELECT * FROM Penulis';
    db.query(sql, (error, result) => {
        response(200, result, 'Data penulis', res);
    });
});

// GET endpoint untuk mendapatkan data buku
app.get('/buku', (req, res) => {
    const sql = 'SELECT * FROM Buku';
    db.query(sql, (error, result) => {
        response(200, result, 'Data buku', res);
    });
});

// GET endpoint untuk mendapatkan data pelanggan
app.get('/pelanggan', (req, res) => {
    const sql = 'SELECT * FROM Pelanggan';
    db.query(sql, (error, result) => {
        response(200, result, 'Data pelanggan', res);
    });
});

// GET endpoint untuk mendapatkan data pembelian
app.get('/pembelian', (req, res) => {
    const sql = 'SELECT * FROM Pembelian';
    db.query(sql, (error, result) => {
        response(200, result, 'Data pembelian', res);
    });
});

// POST endpoint untuk menambah data penerbit
app.post('/penerbit', (req, res) => {
    const { nama_penerbit, alamat } = req.body;
    const sql = `INSERT INTO Penerbit (nama_penerbit, alamat) VALUES ('${nama_penerbit}', '${alamat}')`;
    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `Gagal menambahkan penerbit ${nama_penerbit}`, res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data penulis
app.post('/penulis', (req, res) => {
    const { nama_penulis, biografi } = req.body;
    const sql = `INSERT INTO Penulis (nama_penulis, biografi) VALUES ('${nama_penulis}', '${biografi}')`;
    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `Gagal menambahkan penulis ${nama_penulis}`, res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data buku
app.post('/buku', (req, res) => {
    const { judul, isbn, id_penerbit, id_penulis, harga, stok } = req.body;
    const sql = `INSERT INTO Buku (judul, isbn, id_penerbit, id_penulis, harga, stok) VALUES ('${judul}', '${isbn}', ${id_penerbit}, ${id_penulis}, ${harga}, ${stok})`;
    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `Gagal menambahkan buku ${judul}`, res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data pelanggan
app.post('/pelanggan', (req, res) => {
    const { nama, alamat, no_telp } = req.body;
    const sql = `INSERT INTO Pelanggan (nama, alamat, no_telp) VALUES ('${nama}', '${alamat}', '${no_telp}')`;
    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `Gagal menambahkan pelanggan ${nama}`, res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data pembelian
app.post('/pembelian', (req, res) => {
    const { id_buku, jumlah, tanggal_beli, id_pelanggan } = req.body;
    const sql = `INSERT INTO Pembelian (id_buku, jumlah, tanggal_beli, id_pelanggan) VALUES (${id_buku}, ${jumlah}, '${tanggal_beli}', ${id_pelanggan})`;
    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `Gagal menambahkan pembelian buku`, res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});
