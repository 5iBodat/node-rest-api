var conn = require('../Config/koneksi')
var mysql = require('mysql')
var md5 = require('md5')
var response = require('../Models/user')
var jwt = require('jsonwebtoken')
var config = require('../Config/secret')
var ip = require('ip')

// controller register
exports.registrasi = function(req, res) {
    var post = {
        name: req.body.name,
        email: req.body.email,
        pass: md5(req.body.pass),
        role: req.body.role
    }

    var query = `select * from ?? where ??=?`
    var table = ['user', 'email', post.email]

    query = mysql.format(query, table)

    conn.query(query, function(error, rows) {
        if (error) throw error
        console.log(rows.length)
        if (rows.length == 0) {
            var query = 'insert into ?? set ?'
            var table = ['user']
            query = mysql.format(query, table)
            conn.query(query, post, function(error, rows) {
                if (error) throw error
                response.ok('berhasil menambahkan data user baru', res)
            })
        } else {
            response.ok('Email sudah terdaftar', res)
        }
    })
}

// controller login
exports.login = function(req, res) {
    let post = {
        email: req.body.email,
        pass: req.body.pass
    }

    var query = "select * from ?? where ??=? and ??=?"
    var table = ['user', 'email', post.email, 'pass', md5(post.pass)]

    query = mysql.format(query, table)

    conn.query(query, function(error, rows) {
        if (error) throw error
        if (rows.length == 1) {
            var token = jwt.sign({ rows }, config.secret, {
                expiresIn: 1440
            })
            id_user = rows[0].id

            var data = {
                id_user: id_user,
                access_token: token,
                ip_address: ip.address()
            }

            var query = 'insert into ?? set ?'
            var table = ['access_token']

            query = mysql.format(query, table)
            conn.query(query, data, function(error, rows) {
                if (error) throw error
                res.json({
                    success: true,
                    message: "token jwt tergenerate",
                    token: token,
                    currUser: data.id_user
                });
            })
        } else {
            res.json({ 'Error': true, 'message': 'Email atau password salah' })
        }
    })
}

exports.admin = function(req, res) {
    response.ok('halaman ini hanya untuk user dengan role = 2', res)
}