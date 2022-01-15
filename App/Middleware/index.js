const express = require('express');
const auth = require('./auth')
const router = express.Router();
const verifikasi = require('./verifikasi')

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu autorization
router.get('/api/v1/admin', verifikasi(2), auth.admin)

module.exports = router;