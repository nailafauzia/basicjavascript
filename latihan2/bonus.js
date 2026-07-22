// --- DATA UTAMA (Diperbarui Khusus Bonus) ---
const categories = [
  { id: 1, name: "Programming" },
  { id: 2, name: "Self Improvement" },
  { id: 3, name: "Novel" }
];

const authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

// Menambahkan 'categoryId' pada setiap buku sesuai instruksi
const books = [
  { id: 1, title: "Clean Code", authorId: 1, categoryId: 1, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, categoryId: 2, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, categoryId: 1, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, categoryId: 3, year: 2005, available: true }
];

console.log("=== BONUS CHALLENGE ===\n");

// Fitur 1: Menampilkan nama kategori setiap buku
console.log("--- 1. Kategori Setiap Buku ---");
books.forEach(book => {
  // Menggunakan .find() karena 1 buku hanya punya 1 kategori
  const category = categories.find(c => c.id === book.categoryId);
  console.log(`Buku: ${book.title} | Kategori: ${category.name}`);
});
console.log("");


// Fitur 2: Menghitung jumlah buku pada setiap kategori
// Sekaligus Fitur 3: Mencari kategori dengan buku terbanyak
console.log("--- 2 & 3. Statistik Kategori ---");

// Menyiapkan variabel kosong untuk menyimpan rekor terbanyak
let namaKategoriTerbanyak = "";
let jumlahBukuTerbanyak = 0;

categories.forEach(category => {
  // Menggunakan .filter() karena 1 kategori bisa berisi banyak buku
  const bukuDiKategori = books.filter(book => book.categoryId === category.id);
  const jumlah = bukuDiKategori.length;

  console.log(`Kategori ${category.name}: ${jumlah} buku`);

  // Logika Pengkondisian (If) untuk mencari yang terbanyak
  if (jumlah > jumlahBukuTerbanyak) {
    jumlahBukuTerbanyak = jumlah;          // Update rekor angkanya
    namaKategoriTerbanyak = category.name; // Update nama kategorinya
  }
});

console.log("\n--- Hasil Kategori Terbanyak ---");
console.log(`Kategori dengan buku terbanyak adalah: ${namaKategoriTerbanyak} (${jumlahBukuTerbanyak} buku)`);