// 1. Memanggil Express.js yang baru saja kita install
const express = require('express');
const app = express();
const port = 3000;

// Agar aplikasi kita bisa membaca data berformat JSON
app.use(express.json());

// --- DATA UTAMA (Data dari kamu) ---
const authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

const books = [
  { id: 1, title: "Clean Code", authorId: 1, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, year: 2005, available: true }
];

// --- MEMBUAT ENDPOINT API ---

// Endpoint 1: Halaman utama (sebagai tes)
app.get('/', (req, res) => {
  res.send('Selamat datang di API Perpustakaan!');
});

// Endpoint 2: Mengambil semua data Penulis
app.get('/api/authors', (req, res) => {
  // Mengirim respons dengan format JSON yang rapi
  res.json({
    status: "sukses",
    pesan: "Berhasil mengambil data penulis",
    data: authors
  });
});

// Endpoint 3: Mengambil semua data Buku
app.get('/api/books', (req, res) => {
  res.json({
    status: "sukses",
    pesan: "Berhasil mengambil data buku",
    data: books
  });
});
// Endpoint 4: Mengambil SATU buku berdasarkan ID (Fitur ekstra untukmu!)
app.get('/api/authors/:id', (req, res) => {
  // Menangkap angka ID dari URL, ubah ke tipe angka (integer)
  const cariId = parseInt(req.params.id);
  
  // Mencari buku yang id-nya cocok dengan yang dicari
  const authorDitemukan = authors.find(author => author.id === cariId);

  if (authorDitemukan) {
    res.json({ status: "sukses", data: authorDitemukan });
  } else {
    // Status 404 artinya 'Not Found' atau tidak ditemukan
    res.status(404).json({ status: "gagal", pesan: "Maaf, author tidak ditemukan!" });
  }
});
// Endpoint 4: Mengambil SATU buku berdasarkan ID (Fitur ekstra untukmu!)
app.get('/api/books/:id', (req, res) => {
  // Menangkap angka ID dari URL, ubah ke tipe angka (integer)
  const cariId = parseInt(req.params.id);
  
  // Mencari buku yang id-nya cocok dengan yang dicari
  const bukuDitemukan = books.find(buku => buku.id === cariId);

  if (bukuDitemukan) {
    res.json({ status: "sukses", data: bukuDitemukan });
  } else {
    // Status 404 artinya 'Not Found' atau tidak ditemukan
    res.status(404).json({ status: "gagal", pesan: "Maaf, buku tidak ditemukan!" });
  }
});

// --- MENYALAKAN SERVER ---
app.listen(port, () => {
  console.log(`API sudah berjalan. Buka http://localhost:${port}`);
});