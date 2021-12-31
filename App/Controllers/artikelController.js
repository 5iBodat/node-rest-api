'use strict'

const response = require("../Models/User")
const conn = require("../Config/koneksi")

exports.index = function(req, res) {
    let currentPage = req.query.page || 1
    let perPage = req.query.perPage || 10
    let totalItems = {};
    conn.query('select * from artikel', function(error, rows, fields) {
        if (error) throw error
        totalItems = rows.length
    })

    conn.query(`select a.id_artikel, a.judul_artikel,a.img_artikel, b.title_category_id as category, a.description, a.text_artikel_page1, a.text_artikel_page2, a.text_artikel_page3 from artikel a join artikel_category b on a.category_artikel = b.id_category limit ${perPage} offset ${(currentPage - 1) * perPage} `, function(error, rows, fields) {
        if (error) throw error
        let data = {
            'page': currentPage,
            'per_page': perPage,
            'total': totalItems,
            'rows': rows
        };
        response.ok(data, res)
    })
}

exports.getById = (req, res) => {
    let id = req.params.id
    conn.query(`select * from artikel where id_artikel = ${id}`, (error, rows, fields) => {
        if (error) throw error
        response.ok(rows, res)
    })
}