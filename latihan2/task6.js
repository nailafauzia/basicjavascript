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
books.forEach(book => { //foreaach fungsi nya membaca data1ersatu dari awal sampai akhir book => arrow functionJadi, pada putaran pertama, book adalah "Clean Code", pada putaran kedua book adalah "Atomic Habits", dan seterusnya.
  const author = authors.find(a => a.id === book.authorId);
  // .find() bertugas mencari satu data spesifik.
//a =>: Mewakili satu data penulis tunggal yang sedang dicek dari dalam array authors.
//a.id === book.authorId: Ini adalah syarat pencariannya. Mesin akan mencari penulis yang nilai id-nya sama persis (===) dengan authorId dari buku yang sedang di-loop saat ini.
//temu, seluruh data penulis tersebut (beserta nama dan negaranya) disimpan ke dalam variabel baru bernama author
  console.log(book.title);
  console.log(`Penulis: ${author.name}`);//(`) template literal
  console.log(`Negara: ${author.country}`);
  console.log(`Tahun: ${book.year}`);
  console.log(`Status: ${book.available ? 'Tersedia' : 'Dipinjam'}\n`);//ternary Operator, yaitu versi satu baris (super singkat) dari logika if-else
    //Syarat yang dicek adalah book.available.tnda tanya (?) berarti JIKA TRUE (buku ada), maka cetak kata 'Tersedia'.Tanda titik dua (:) berarti JIKA FALSE (buku tidak ada), maka cetak kata 'Dipinjam'.\n: Ini adalah simbol newline. Fungsinya sama seperti menekan tombol "Enter".
});