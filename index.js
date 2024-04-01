const express = require('express')
const app = express()
const port = 3002
const bodyParser = require ('body-parser')
const db = require('./config.js')
const response = require ('./request.js')
app.use(bodyParser.json())
app.get('/buku',(req,res)=>{
    const sql = 'SELECT * FROM buku'
    db.query(sql,(error, result)=>{
        response(200,result,'data buku',res)
    })
   
})
app.get('/pelanggan',(req,res)=>{
    const sql = 'SELECT * FROM pelanggan'
    db.query(sql,(error, result)=>{
        response(200,result,'data pelanggan',res)
    })
   
})
app.get('/pembelian',(req,res)=>{
    const sql = 'SELECT * FROM pembelian'
    db.query(sql,(error, result)=>{
        response(200,result,'data pembelian',res)
    })

})
app.get('/penerbit',(req,res)=>{
    const sql = 'SELECT * FROM penerbit'
    db.query(sql,(error, result)=>{
        response(200,result,'data penerbit',res)
    })

})
app.get('/penulis',(req,res)=>{
    const sql = 'SELECT * FROM penulis'
    db.query(sql,(error, result)=>{
        response(200,result,'data penulis',res)
    })
    
})
app.get('/tabel buku',(req,res)=>{
    const sql = 'SELECT * FROM tabel buku'
    db.query(sql,(error, result)=>{
        response(200,result,'data tabel buku',res)
    })
})
app.get('/buku/:id_buku',(req,res)=>{//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    const passenger_id = req.params.passenger_id
    const sql = `SELECT * FROM buku where id_buku ='${id_buku}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail buku",res)
    })
})
app.get('/routes/:id_pelanggan',(req,res)=>{
    const id_pelanggan = req.params.id_pelanggan
    const sql = `SELECT * FROM routes where id_pelanggan ='${id_pelanggan}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail pelanggan",res)
    })
})
app.get('/pembelian/:id_pembelian',(req,res)=>{
    const id_pembelian = req.params.ticket_id
    const sql = `SELECT * FROM tickets where id_pembelian ='${id_pembelian}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail tickets",res)
    })
})

app.get('/penerbit/:id_penerbit',(req,res)=>{
    const id_penerbit = req.params.ticket_id
    const sql = `SELECT * FROM tickets where id_penerbit ='${id_penerbit}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail tickets",res)
    })
})

app.get('/penulis/:id_penulis',(req,res)=>{
    const id_penulis = req.params.ticket_id
    const sql = `SELECT * FROM tickets where id_pembelian ='${id_penulis}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail tickets",res)
    })

})

app.get('/toko buku/:id_buku',(req,res)=>{
    const id_buku = req.params.ticket_id
    const sql = `SELECT * FROM tickets where id_buku ='${id_buku}'`
    db.query(sql, (err, result)=>{
        if(err)throw err
        response(200,result,"get detail tickets",res)
    })

})
app.post('/passengers',(req, res)=>{
    const {passenger_id, nama, jenis_kelamin, umur, email, notelp}=req.body
    const sql = `INSERT INTO passengers (passenger_id,nama,jenis_kelamin,umur,email,notelp) values ('${passenger_id}','${nama}','${jenis_kelamin}','${umur}','${email}','${notelp}');`
    db.query(sql,(error, fields)=>{
    if(error)response(500, 'invalid', `${nama} dengan id ${passenger_id} sudah di tambahkan`, res)
    if(fields?.affectedRows){
        const data = {
            isSucces: fields.affectedRows,
            id:fields.insertId,
        }
        response(200,data,"Data berhasil di simpan",res)
    }
    })
})
app.post('/routes',(req, res)=>{
    const {route_id, asal, tujuan, tarif}=req.body
    const sql = `INSERT INTO routes (route_id,asal,tujuan,tarif) values ('${route_id}','${asal}','${tujuan}','${tarif}');`
    db.query(sql,(error, fields)=>{
    if(error)response(500, 'invalid', `${asal} dengan id ${route_id} sudah di tambahkan`, res)
    if(fields?.affectedRows){
        const data = {
            isSucces: fields.affectedRows,
            id:fields.insertId,
        }
        response(200,data,"Data berhasil di simpan",res)
    }
    })
})
app.post('/tickets',(req, res)=>{
    const {ticket_id,passenger_id, route_id, tanggal_pembelian, jumlah}=req.body
    const sql = `INSERT INTO tickets (ticket_id,passenger_id,route_id,tanggal_pembelian,jumlah) values ('${ticket_id}','${passenger_id}','${route_id}','${tanggal_pembelian}','${jumlah}');`
    db.query(sql,(error, fields)=>{
    if(error)response(500, 'invalid', `${passenger_id} dengan id ${ticket_id} sudah di tambahkan`, res)
    if(fields?.affectedRows){
        const data = {
            isSucces: fields.affectedRows,
            id:fields.insertId,
        }
        response(200,data,"Data berhasil di simpan",res)
    }
    })
})
app.listen(port, () => {
    console.log(`Runing in port ${port}`)
})





