// Menangkap elemen-elemen dari HTML
const inputBuku = document.querySelector('input[name="nama_buku"]');
const btnTambah = document.getElementById('tambah');
const ulDataBuku = document.querySelector('.data-buku');

// 1. Mengambil data dari localStorage saat halaman pertama kali dimuat
// Jika belum ada data ('daftarBuku' kosong), maka buat array kosong []
let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];

// 2. Fungsi untuk merender/menampilkan list buku dari array ke layar
function renderBuku() {
    // Kosongkan isi <ul> terlebih dahulu agar tidak terjadi duplikasi saat render ulang
    ulDataBuku.innerHTML = '';
    
    // Looping data dari array untuk dibuatkan elemen <li>
    daftarBuku.forEach(function(buku) {
        const li = document.createElement('li');
        li.textContent = buku;
        ulDataBuku.appendChild(li);
    });
}

// 3. Fungsi utama untuk menambahkan buku
function tambahBuku() {
    const nilaiBuku = inputBuku.value.trim();

    // Validasi: pastikan input tidak kosong
    if (nilaiBuku === '') {
        alert('Mohon masukkan nama buku terlebih dahulu!');
        return;
    }

    // Masukkan data baru ke dalam array daftarBuku
    daftarBuku.push(nilaiBuku);

    // Simpan array yang sudah diperbarui ke localStorage
    // (localStorage hanya menerima string, jadi kita ubah array menjadi format JSON string)
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));

    // Panggil fungsi render untuk memperbarui tampilan di layar
    renderBuku();

    // Kosongkan input kembali dan kembalikan fokus kursor
    inputBuku.value = '';
    inputBuku.focus();
}

// 4. Menjalankan fungsi tambahBuku saat tombol diklik
btnTambah.addEventListener('click', tambahBuku);

// Fitur tambahan: Menjalankan fungsi saat tombol 'Enter' ditekan pada keyboard
inputBuku.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        tambahBuku();
    }
});

// 5. Panggil renderBuku() saat file script pertama kali dijalankan (saat halaman dimuat/refresh)
renderBuku();