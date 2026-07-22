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
function tampilkanDashboard() {
  // 1. Menghitung Total Buku & Penulis
  const totalBuku = books.length;
  const totalPenulis = authors.length;
  
  // 2. Menghitung Status Buku
  const bukuTersedia = books.filter(b => b.available === true).length;
  const bukuDipinjam = totalBuku - bukuTersedia;

  // 3. Menghitung Penulis Berdasarkan Negara menggunakan filter()
  const penulisIndonesia = authors.filter(a => a.country === "Indonesia").length;
  const penulisLuar = authors.filter(a => a.country !== "Indonesia").length; // !== artinya "TIDAK SAMA DENGAN"

  // 4. Mencari Buku Terbaru dan Terlama
  // .map() digunakan untuk mengekstrak hanya 'tahun' dari seluruh buku menjadi array [2008, 2018, 2019, 2005]
  const arrayTahun = books.map(book => book.year);
  
  // Math.max dan Math.min adalah fungsi bawaan JavaScript untuk mencari angka terbesar dan terkecil
  const bukuTerbaru = Math.max(...arrayTahun);
  const bukuTerlama = Math.min(...arrayTahun);

  // --- MENCETAK KE TERMINAL SESUAI FORMAT PDF ---
  console.log("========================");
  console.log("");
  console.log("LIBRARY DASHBOARD");
  console.log("");
  console.log("========================");
  console.log("");
  console.log(`Total Buku\t\t: ${totalBuku}`);
  console.log(`Total Penulis\t\t: ${totalPenulis}`);
  console.log(`Buku Tersedia\t\t: ${bukuTersedia}`);
  console.log(`Buku Dipinjam\t\t: ${bukuDipinjam}`);
  console.log(`Penulis Indonesia\t: ${penulisIndonesia}`);
  console.log(`Penulis Luar Indonesia\t: ${penulisLuar}`);
  console.log(`Buku Terbaru\t\t: ${bukuTerbaru}`);
  console.log(`Buku Terlama\t\t: ${bukuTerlama}`);
  console.log("");
  console.log("========================");
}

// Memanggil fungsi dashboard
tampilkanDashboard();
