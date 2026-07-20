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