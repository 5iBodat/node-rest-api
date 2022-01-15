'use strict'

var response = require('../Models/User')
var connection = require('../Config/koneksi')
var md5 = require('md5');
const { json } = require('body-parser');

// membut index
exports.index = function(req, res) {
    response.ok('Aplikasi Api is Running', res)
}

// menampilkan 100 data user
exports.users = function(req, res) {
    // SELECT DISTINCT first_name, nama_role FROM users INNER JOIN role_categories ON FIND_IN_SET(role_categories.id_role, id_roles) != 0;
    connection.query(`SELECT DISTINCT users.*, role_categories.nama_role from users INNER JOIN role_categories ON FIND_IN_SET(role_categories.id_role, id_roles) != 0`, function(error, rows, field) {
        if (error) throw error
        response.nested(rows, res)
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
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let password = md5(req.body.password)
    let status_user = 0
    let jenis = 3

    connection.query(`insert into users (first_name, last_name, email, password, status_user, jenis) values (?,?,?,?,?,?)`, [first_name, last_name, email, password, status_user, jenis],
        function(error, rows, fields) {
            if (error) throw error
            response.ok('Berhasil Menambahkan Data', res)
        })
}

//mengubah data user

exports.update = function(req, res) {
    let id = req.body.id_user;
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let password = md5(req.body.password)
    let status_user = 0

    connection.query(`update users set first_name=?, last_name=?, password=?, status_user=? where id_user = ${id}`, [first_name, last_name, password, status_user], function(error, rows, field) {
        if (error) throw error
        response.ok('berhasil mengubah data', res)
    })
}

exports.delete = function(req, res) {
    let id = req.body.id_user;
    connection.query(`delete from users where id_user = ${id}`, function(error, rows, field) {
        if (error) throw error
        response.ok('Berhasil Menghapus data', res)
    })
}

exports.usersNested = function(req, res) {
    connection.query('select id_user, id_roles from users limit 10', function(error, rows, field) {
        if (error) throw error
        response.nested(rows, res)
    });
}