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

// --- BONUS CHALLENGE ---
console.log("=== BONUS CHALLENGE: URUTAN BUKU TERBARU ===");
const bukuTerbaru = [...books].sort((a, b) => b.year - a.year);
bukuTerbaru.forEach(book => {
  const author = authors.find(a => a.id === book.authorId);
  if (author) {
    console.log(`[${book.year}] ${book.title} - ${author.name}`);
  }
});