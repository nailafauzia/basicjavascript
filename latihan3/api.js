const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
// PENTING: Middleware ini wajib ada agar Express bisa membaca isian Form HTML
app.use(express.urlencoded({ extended: true }));

// --- DATA UTAMA (Ubah jadi 'let' agar bisa diedit/dihapus) ---
let authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

let books = [
  { id: 1, title: "Clean Code", authorId: 1, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, year: 2005, available: true }
];

// ==========================================
// A. FITUR WEB (TAMPILAN EJS)
// ==========================================

// 1. Halaman Utama
app.get('/', (req, res) => {
  const bukuDenganPenulis = books.map(buku => {
    // Mengecek apakah buku ini sudah pakai teks bebas atau masih ID lama
    let namaPenulis = buku.authorName; 
    if (!namaPenulis) { // Jika masih pakai sistem lama
      const penulis = authors.find(a => a.id === parseInt(buku.authorId));
      namaPenulis = penulis ? penulis.name : "Tidak diketahui";
    }
    return { ...buku, authorName: namaPenulis };
  });
  res.render('index', { dataBuku: bukuDenganPenulis });
});
// 2. Tampilkan Form Tambah Buku
app.get('/tambah', (req, res) => {
  // Kita kirim data authors agar bisa dipilih di dropdown form
  res.render('tambah', { dataPenulis: authors }); 
});

// 3. Proses Simpan Buku Baru
app.post('/tambah', (req, res) => {
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  
  const bukuBaru = {
    id: newId,
    title: req.body.title,
    authorName: req.body.authorName, // Sekarang menyimpan teks langsung
    year: parseInt(req.body.year),
    available: req.body.available === 'true'
  };
  
  books.push(bukuBaru);
  res.redirect('/');
});
// Proses Penambahan Penulis Baru
app.post('/tambah-penulis', (req, res) => {
  // Membuat ID urut otomatis
  const newId = authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1;
  
  const penulisBaru = {
    id: newId,
    name: req.body.name,
    country: req.body.country // Menangkap isian asal negara dari form HTML
  };
  
  authors.push(penulisBaru); // Memasukkan data ke dalam array memory
  res.redirect('/daftar-penulis'); // Me-refresh halaman secara otomatis
});
// 4. Tampilkan Form Edit Buku
app.get('/edit/:id', (req, res) => {
  const cariId = parseInt(req.params.id);
  const bukuDitemukan = books.find(buku => buku.id === cariId);
  
  if (bukuDitemukan) {
    res.render('edit', { buku: bukuDitemukan, dataPenulis: authors });
  } else {
    res.send('Buku tidak ditemukan!');
  }
});

// 5. Proses Update Data Buku
app.post('/edit/:id', (req, res) => {
  const cariId = parseInt(req.params.id);
  const indexBuku = books.findIndex(buku => buku.id === cariId);
  
  if (indexBuku !== -1) {
    books[indexBuku].title = req.body.title;
    books[indexBuku].authorName = req.body.authorName; // Update dengan teks
    books[indexBuku].year = parseInt(req.body.year);
    books[indexBuku].available = req.body.available === 'true';
  }
  res.redirect('/');
});

// 6. Proses Hapus Buku
app.post('/hapus/:id', (req, res) => {
  const cariId = parseInt(req.params.id);
  // Buang buku yang ID-nya cocok, simpan sisanya
  books = books.filter(buku => buku.id !== cariId);
  res.redirect('/');
});

// 7. Halaman Khusus Daftar Penulis
app.get('/daftar-penulis', (req, res) => {
  res.render('authors', { dataPenulis: authors });
});

// 8. Halaman Khusus Daftar Judul Buku
app.get('/daftar-buku', (req, res) => {
  res.render('books-list', { dataBuku: books });
});

// 9. Pencarian Penulis Spesifik (Berdasarkan ID)
app.get('/daftar-penulis/:id', (req, res) => {
  const cariId = parseInt(req.params.id);
  
  // Kita pakai .filter() agar hasilnya tetap berbentuk Array, 
  // karena di file .ejs kita menggunakan .forEach()
  const penulisDitemukan = authors.filter(author => author.id === cariId);
  
  res.render('authors', { dataPenulis: penulisDitemukan });
});

// 10. Pencarian Buku Spesifik (Berdasarkan ID)
app.get('/daftar-buku/:id', (req, res) => {
  const cariId = parseInt(req.params.id);
  
  const bukuDitemukan = books.filter(buku => buku.id === cariId);
  
  res.render('books-list', { dataBuku: bukuDitemukan });
});
// ==========================================
// B. ENDPOINT API (UNTUK MESIN / TOMBOL JSON)
// ==========================================
app.get('/api/authors', (req, res) => {
  res.json({ status: "sukses", data: authors });
});

app.get('/api/books', (req, res) => {
  res.json({ status: "sukses", data: books });
});

app.listen(port, () => {
  console.log(`Server nyala di http://localhost:${port}`);
});