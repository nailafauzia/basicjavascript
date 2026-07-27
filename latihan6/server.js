const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path'); // Memanggil modul path bawaan Node.js
const app = express();

app.use(express.json());

// Menyuruh Express menjadikan folder 'public' sebagai tempat file statis (HTML, CSS, dll)
app.use(express.static('public')); 

// ==========================================
// RUTE HALAMAN WEB (FRONTEND)
// ==========================================
// Jika user membuka halaman utama (/), otomatis lempar ke halaman login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Menampilkan file login.html saat user ke rute /login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Menampilkan file konversi.html saat user ke rute /konversi-suhu
app.get('/konversi-suhu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'konversi.html'));
});

// ==========================================
// A. SETUP HARDCODE USER & SECRET KEY
// ==========================================

// Kunci rahasia ini digunakan untuk membuat 'stempel digital' (Signature). Jangan sampai bocor!
const SECRET_KEY = "rahasia_server_naila"; // kunci untuk membuat Signature.

const HARDCODED_USER = { // PAYLOAD
    id: 1,
    username: "naila", 
    password: "naila",
    role: "admin"
};


// ==========================================
// B. ENDPOINT LOGIN (GENERATE TOKEN)
// ==========================================
app.post('/api/login', (req, res) => { // Membuat rute khusus untuk menerima data login
    const { username, password } = req.body; // Menarik data username dan password yang diketik oleh klien.

    // 1. Validasi apakah ada input
    if (!username || !password) { // Validasi awal: menolak request jika ada kolom yang dibiarkan kosong.
        return res.status(400).json({ status: "error", message: "Username dan password wajib diisi." });
    }

    // 2. Cek apakah username dan password cocok dengan hardcode
    if (username === HARDCODED_USER.username && password === HARDCODED_USER.password) {
        // implementasi hardcoded username dan password. Sistem mengecek apakah input klien sama persis dengan data statis yang kita tulis di atas.
        
        // 3. Buat Payload (Data yang akan dibungkus di dalam token)
        const payload = {
            id: HARDCODED_USER.id,
            username: HARDCODED_USER.username,
            role: HARDCODED_USER.role
        }; // disertakan di sini untuk keperluan Authorization di masa depan (misalnya, hanya admin yang boleh hapus data).

        // 4. Generate Token 
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1m' }); // fungsi ini menggabungkan Payload dengan SECRET_KEY untuk mencetak token. { expiresIn: '1m' } adalah fitur keamanan agar token akan hangus secara otomatis dalam 1 menit.

        // 5. Kirim token ke klien
        return res.json({
            status: "success",
            message: "Login berhasil!",
            token: token
        }); // Server membungkus token yang baru dicetak tadi ke dalam format JSON, lalu memberikannya kepada klien.
    } else {
        return res.status(401).json({ status: "error", message: "Username atau password salah." });
    }
});

// ==========================================
// C. MIDDLEWARE AUTHENTICATION (SATPAM API)
// ==========================================
// Fungsi ini akan mencegat request untuk mengecek apakah user bawa "Kartu Identitas" yang sah.
const verifyToken = (req, res, next) => {
    // Klien harus mengirim token di dalam header 'Authorization'. Parameter next sangat penting; ini adalah perintah untuk "membukakan gerbang".
    const authHeader = req.headers['authorization'];
    
    // Format token yang dikirim harus: "Bearer <token_panjang>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: "error", message: "Akses ditolak. Token tidak ditemukan atau format salah." });
    }
    // Pisahkan kata 'Bearer' dan ambil tokennya saja
    const token = authHeader.split(' ')[1]; // Format bawaan header biasanya "Bearer [token_panjang]". Kode ini memotong spasi dan hanya mengambil token panjangnya saja (indeks ke-1).

    // Verifikasi keaslian token menggunakan kunci rahasia
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: "error", message: "Token tidak valid atau sudah kadaluarsa. Silakan login ulang." });
        } // Mengecek keaslian token menggunakan SECRET_KEY. Jika error (err), langsung ditolak.
        
        // Jika valid, simpan data hasil bongkaran token (payload) ke req.user
        req.user = decoded; 
        next(); // Persilakan klien masuk ke endpoint tujuan
    });
};

// ==========================================
// D. ENDPOINT DILINDUNGI (CONVERT SUHU)
// ==========================================
// Perhatikan kita menyisipkan 'verifyToken' di tengah-tengah parameter
app.post('/api/convert-suhu', verifyToken, (req, res) => {
    let { value, from, to } = req.body;

    if (value === undefined || !from || !to) {
        return res.status(400).json({ status: "error", message: "Parameter 'value', 'from', dan 'to' wajib diisi." });
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        return res.status(400).json({ status: "error", message: "Nilai suhu tidak valid. Harus berupa angka." });
    }

    from = from.toUpperCase();
    to = to.toUpperCase();
    const validUnits = ['C', 'F', 'R', 'K'];
    
    if (!validUnits.includes(from) || !validUnits.includes(to)) {
        return res.status(400).json({ status: "error", message: "Unit tidak valid. Gunakan C, F, R, atau K." });
    }

    let inCelsius = 0;
    switch (from) {
        case 'C': inCelsius = numericValue; break;
        case 'F': inCelsius = (numericValue - 32) * 5 / 9; break;
        case 'R': inCelsius = numericValue * 5 / 4; break;
        case 'K': inCelsius = numericValue - 273.15; break;
    }

    let result = 0;
    switch (to) {
        case 'C': result = inCelsius; break;
        case 'F': result = (inCelsius * 9 / 5) + 32; break;
        case 'R': result = inCelsius * 4 / 5; break;
        case 'K': result = inCelsius + 273.15; break;
    }

    result = Math.round(result * 100) / 100;

    res.json({
        status: "success",
        // Menampilkan pesan sapaan untuk membuktikan data user terbaca dari token
        message: `Yooo ${req.user.role} ${req.user.username}, konversi berhasil!`,
        data: {
            input: { value: numericValue, unit: from },
            result: { value: result, unit: to }
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});