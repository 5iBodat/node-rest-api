var mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admin_kh2019'
})

conn.connect((err) => {
    if (err) throw err;
    console.log('Terkoneksi ke database')
})

module.exports = conn;