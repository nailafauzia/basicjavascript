require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const cors = require('cors');

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'secret_kunci_jwt_123';

const loginSchema = z.object({
  email: z.string().email({ message: "Format wajib berupa email valid." }),
  password: z.string().min(8, { message: "Password minimal 8 karakter." })
});

let authors = [
  { id: 1, name: "Robert C. Martin", country: "USA" },
  { id: 2, name: "James Clear", country: "USA" },
  { id: 3, name: "Marijn Haverbeke", country: "Netherlands" },
  { id: 4, name: "Andrea Hirata", country: "Indonesia" }
];

let categories = [
  { id: 1, name: "Umum" },
  { id: 2, name: "Fiksi" },
  { id: 3, name: "Teknologi" },
  { id: 4, name: "Pengembangan Diri" }
];

let books = [
  { id: 1, title: "Clean Code", authorId: 1, categoryId: 3, year: 2008, available: true },
  { id: 2, title: "Atomic Habits", authorId: 2, categoryId: 4, year: 2018, available: false },
  { id: 3, title: "Eloquent JavaScript", authorId: 3, categoryId: 3, year: 2019, available: true },
  { id: 4, title: "Laskar Pelangi", authorId: 4, categoryId: 2, year: 2005, available: true }
];

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) return res.status(401).json({ message: "Email atau password salah." });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token tidak ada." });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid." });
    res.json({ user: decoded }); 
  });
});

app.get('/api/categories', (req, res) => res.json(categories));

// --- ENDPOINT AUTHORS TERPISAH ---
app.get('/api/authors', (req, res) => {
  res.json(authors);
});

// --- ENDPOINT BOOKS TERPISAH ---
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const { title, authorName, categoryId, year } = req.body;
  let author = authors.find(a => a.name.toLowerCase() === authorName.toLowerCase());
  if (!author) {
    author = { id: authors.length + 1, name: authorName, country: "Unknown" };
    authors.push(author);
  }

  const newBook = {
    id: books.length + 1,
    title: title,
    authorId: author.id,
    categoryId: parseInt(categoryId),
    year: parseInt(year),
    available: true
  };
  books.push(newBook);
  res.json(newBook);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
  const author = authors.find(a => a.id === book.authorId);
  res.json({ ...book, authorName: author ? author.name : "" });
});

app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, authorName, categoryId, year, available } = req.body;
  let bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return res.status(404).json({ message: "Buku tidak ditemukan" });

  let author = authors.find(a => a.name.toLowerCase() === authorName.toLowerCase());
  if (!author) {
    author = { id: authors.length + 1, name: authorName, country: "Unknown" };
    authors.push(author);
  }

  books[bookIndex] = { id: bookId, title, authorId: author.id, categoryId: parseInt(categoryId), year: parseInt(year), available };
  res.json(books[bookIndex]);
});

app.delete('/api/books/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Buku dihapus" });
});

app.listen(3000, () => console.log('Backend berjalan di http://localhost:3000'));