let books = [];
const STORAGE_KEY = 'BOOK_CATALOG_DATA';
let currentCoverBase64 = ''; // Variabel state untuk menyimpan data gambar sementara

// Elemen DOM
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const idInput = document.getElementById('book-id');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const coverInput = document.getElementById('cover');
const coverPreview = document.getElementById('cover-preview');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');

document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    renderBooks();
});

// LOGIKA CONVERT GAMBAR KE BASE64
coverInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Cek ukuran file (maksimal 2MB untuk mencegah localStorage cepat penuh)
        if (file.size > 2 * 1024 * 1024) {
            alert("Ukuran gambar terlalu besar. Maksimal 2MB.");
            coverInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            currentCoverBase64 = e.target.result; // Ini string Base64 nya
            coverPreview.src = currentCoverBase64;
            coverPreview.style.display = 'block';
        };
        reader.readAsDataURL(file); // Memulai konversi
    } else {
        currentCoverBase64 = '';
        coverPreview.style.display = 'none';
    }
});

bookForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = idInput.value;
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);

    if (id) {
        // Mode UPDATE
        const bookIndex = books.findIndex(book => book.id == id);
        if (bookIndex !== -1) {
            // Jika user tidak upload gambar baru saat edit, pertahankan gambar lama
            const existingCover = books[bookIndex].cover;
            books[bookIndex] = { 
                id: parseInt(id), 
                title, 
                author, 
                year,
                cover: currentCoverBase64 || existingCover 
            };
        }
    } else {
        // Mode CREATE
        const newBook = {
            id: +new Date(), 
            title,
            author,
            year,
            cover: currentCoverBase64 // Simpan string gambar
        };
        books.push(newBook);
    }

    saveDataToStorage();
    resetForm();
    renderBooks();
});

function renderBooks() {
    bookList.innerHTML = ''; 

    if (books.length === 0) {
        bookList.innerHTML = '<p style="color: #666; font-style: italic;">Belum ada buku di perpustakaan Anda.</p>';
        return;
    }

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-card');
        
        // Logika untuk menampilkan gambar atau kotak kosong jika tidak ada gambar
        const coverHTML = book.cover 
            ? `<img src="${book.cover}" alt="Sampul ${book.title}">`
            : `<div class="book-cover-placeholder">Tanpa Sampul</div>`;

        bookElement.innerHTML = `
            <div class="book-cover-wrapper">
                ${coverHTML}
            </div>
            <div class="book-details">
                <h3>${book.title}</h3>
                <p class="author">oleh ${book.author}</p>
                <p class="year">Diterbitkan tahun ${book.year}</p>
                
                <div class="action-links">
                    <span onclick="editBook(${book.id})" class="link-edit">Sunting Profil</span>
                    <span onclick="deleteBook(${book.id})" class="link-delete">Keluarkan Buku</span>
                </div>
            </div>
        `;
        bookList.appendChild(bookElement);
    });
}

window.deleteBook = function(id) {
    if(confirm("Apakah Anda yakin ingin mengeluarkan buku ini dari perpustakaan?")) {
        books = books.filter(book => book.id !== id);
        saveDataToStorage();
        renderBooks();
    }
}

window.editBook = function(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;

    idInput.value = book.id;
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year;
    
    // Tampilkan preview cover lama jika ada
    if (book.cover) {
        coverPreview.src = book.cover;
        coverPreview.style.display = 'block';
        currentCoverBase64 = ''; // Reset form state baru
    } else {
        coverPreview.src = '';
        coverPreview.style.display = 'none';
        currentCoverBase64 = '';
    }

    formTitle.textContent = 'Sunting Koleksi Buku';
    submitBtn.textContent = 'Perbarui Data Katalog';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas otomatis
}

function resetForm() {
    bookForm.reset();
    idInput.value = '';
    currentCoverBase64 = '';
    coverPreview.src = '';
    coverPreview.style.display = 'none';
    formTitle.textContent = 'Tambah Koleksi Baru';
    submitBtn.textContent = 'Simpan ke Katalog';
}

function saveDataToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData) {
        books = JSON.parse(serializedData);
    }
}