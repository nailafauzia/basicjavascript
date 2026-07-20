// --- DATA UTAMA ---
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

// --- Task 6: Menampilkan Detail Buku ---
console.log("=== TASK 6 ===");
books.forEach(book => {
  const author = authors.find(a => a.id === book.authorId);
  console.log(book.title);
  console.log(`Penulis: ${author.name}`);
  console.log(`Negara: ${author.country}`);
  console.log(`Tahun: ${book.year}`);
  console.log(`Status: ${book.available ? 'Tersedia' : 'Dipinjam'}\n`);
});

// --- Task 7: Statistik Penulis ---
console.log("=== TASK 7 ===");
authors.forEach(author => {
  const authorBooks = books.filter(book => book.authorId === author.id);
  console.log(author.name);
  console.log(`Jumlah Buku: ${authorBooks.length}\n`);
});

// --- Task 8: Buku Berdasarkan Negara ---
console.log("=== TASK 8 ===");
function tampilkanBukuBerdasarkanNegara(negara) {
  books.forEach(book => {
    const author = authors.find(a => a.id === book.authorId);
    if (author && author.country === negara) {
      console.log(book.title);
      console.log(author.name);
      console.log(`${author.country}\n`);
    }
  });
}
tampilkanBukuBerdasarkanNegara("Indonesia");
tampilkanBukuBerdasarkanNegara("USA");

// --- Task 9: Validasi Relasi Data ---
console.log("=== TASK 9 ===");
const dataBukuBaru = [
  ...books, 
  { id: 5, title: "Unknown Book", authorId: 99, year: 2024, available: true }
];

dataBukuBaru.forEach(book => {
  const author = authors.find(a => a.id === book.authorId);
  if (!author) {
    console.log(book.title);
    console.log("ERROR");
    console.log("Author tidak ditemukan.\n");
  }
});

// --- Task 10: Dashboard Implementation ---
console.log("=== TASK 10: DASHBOARD ===");
function tampilkanDashboard() {
  const totalPenulis = authors.length;
  const totalBuku = books.length;
  const bukuTersedia = books.filter(b => b.available === true).length;
  const bukuDipinjam = totalBuku - bukuTersedia;

  console.log(`Total Penulis: ${totalPenulis}`);
  console.log(`Total Buku: ${totalBuku}`);
  console.log(`Buku Tersedia: ${bukuTersedia}`);
  console.log(`Buku Sedang Dipinjam: ${bukuDipinjam}\n`);
}
tampilkanDashboard();

// --- BONUS CHALLENGE ---
console.log("=== BONUS CHALLENGE: URUTAN BUKU TERBARU ===");
const bukuTerbaru = [...books].sort((a, b) => b.year - a.year);
bukuTerbaru.forEach(book => {
  const author = authors.find(a => a.id === book.authorId);
  if (author) {
    console.log(`[${book.year}] ${book.title} - ${author.name}`);
  }
});