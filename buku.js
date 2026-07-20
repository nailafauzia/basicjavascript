const authors = [ { id: 1, name: "Robert C. Martin", country: "USA" }, { id: 2, name: "James Clear", country: "USA" }, { id: 3, name: "Marijn Haverbeke", country: "Netherlands" }, { id: 4, name: "Andrea Hirata", country: "Indonesia" } ];

// --- Task 7: Statistik Penulis ---

// 1. Kita putar (loop) setiap penulis yang ada di data authors
authors.forEach(author => {
  
  // 2. Kita saring (filter) data books. 
  // Ambil buku yang authorId-nya SAMA DENGAN id penulis yang sedang di-loop saat ini.
  const bukuPenulis = books.filter(book => book.authorId === author.id);
  
  // 3. Cetak nama penulis
  console.log(author.name);
  
  // 4. Cetak jumlah bukunya dengan menghitung panjang array hasil filter (bukuPenulis.length)
  console.log(`Jumlah Buku: ${bukuPenulis.length}\n`);
  
});

// --- Task 9: Validasi Relasi Data ---

// 1. Menambahkan data bermasalah tanpa merusak data 'books' yang asli
const dataBukuBaru = [
  ...books, 
  {
    id: 5,
    title: "Unknown Book",
    authorId: 99, // Ini ID yang tidak ada di data authors
    year: 2024,
    available: true
  }
];

console.log("=== Pengecekan Validasi Data ===");

// 2. Melakukan perulangan pada array yang baru
dataBukuBaru.forEach(book => {
  // Mencari penulis berdasarkan authorId
  const author = authors.find(a => a.id === book.authorId);
  
  // 3. Validasi dengan Pengkondisian (If/Else)
  if (!author) {
    // Jika author TIDAK ditemukan (undefined)
    console.log(book.title);
    console.log("ERROR");
    console.log("Author tidak ditemukan.\n");
  } else {
    // Jika author ditemukan, program tetap berjalan normal
    console.log(`${book.title} - Penulis: ${author.name} (Aman)\n`);
  }
});