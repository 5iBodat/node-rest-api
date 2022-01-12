'use strict'

// const conn = require("../Config/koneksi");

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
}

exports.nested = function(values, res) {

    const hasil = values.rows.reduce((akumulasikan, item) => {
        if (akumulasikan[item.first_name]) {
            const group = akumulasikan[item.first_name]

            if (Array.isArray(group.nama_role)) {
                group.nama_role.push(item.nama_role);
            } else {
                group.nama_role = [group.nama_role, item.nama_role]
            }
        } else {
            akumulasikan[item.first_name] = item
        }

        return akumulasikan
    }, {})

    var data = {
        'status': 200,
        'values': hasil
    }

    res.json(data);
    res.end();
}