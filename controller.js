'use strict'

var response = require('./res')
var connection = require('./koneksi')
const conn = require('./koneksi')
var md5 = require('md5');

// membut index
exports.index = function(req, res) {
    response.ok('Aplikasi Api is Running', res)
}

// menampilkan 100 data user
exports.users = function(req, res) {
    connection.query('select * from users limit 100', function(error, rows, field) {
        if (error) {
            connection.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

//menampilkan berdasarkan id
exports.getById = function(req, res) {
    let id = req.params.id;

    connection.query(`select * from users where id_user = ${id}`, function(error, rows) {
        if (error) throw error
        response.ok(rows, res)
    });
}

//menambah data users
exports.create = function(req, res) {

    let password = req.body.password;
    let data = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'password': md5(password),
        'active': 0,
        'jenis': 3
    }

    connection.query(`insert into users (first_name, last_name, email, password, active, jenis) values (?,?,?,?,?,?))`,
        data,
        function(error, rows, fields) {
            if (error) throw error
            response.ok('Berhasil Menambahkan Data')
        })
}