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
