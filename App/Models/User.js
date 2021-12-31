'use strict'

const conn = require("../Config/koneksi");

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
}

exports.nested = function(values, res) {
    //lakukan akumulasi
    const hasil = values.reduce((akumulasi, val) => {
        //lakukan key group
        if (akumulasi[val.fullname]) {
            const group = akumulasi[val.fullname]

            if (Array.isArray(group.roles)) {
                group.roles.push(val.roles)
            } else {
                group.roles = [group.roles, val.roles]
            }
        } else {
            akumulasi[val.fullname] = val
        }

        return akumulasi
    }, {})

    var data = {
        'status': 200,
        'values': hasil
    }

    conn.json(data)
    conn.end()
}