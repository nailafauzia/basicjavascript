// Menangkap elemen-elemen dari HTML
const inputBuku = document.querySelector('input[name="nama_buku"]');
const btnTambah = document.getElementById('tambah');
const ulDataBuku = document.querySelector('.data-buku');

// 1. Mengambil data dari localStorage
let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];

// 2. Fungsi untuk merender/menampilkan list buku
function renderBuku() {
    ulDataBuku.innerHTML = '';
    
    daftarBuku.forEach(function(buku, index) {
        const li = document.createElement('li');
        
        const spanTeks = document.createElement('span');
        spanTeks.textContent = buku;

        // Wadah grup tombol Edit & Hapus
        const grupTombol = document.createElement('div');
        grupTombol.className = 'aksi-tombol';

        // Tombol Edit
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.className = 'btn-edit';
        btnEdit.onclick = function() {
            editBuku(index);
        };

        // Tombol Hapus
        const btnHapus = document.createElement('button');
        btnHapus.textContent = 'Hapus';
        btnHapus.className = 'btn-hapus';
        btnHapus.onclick = function() {
            hapusBuku(index);
        };

        grupTombol.appendChild(btnEdit);
        grupTombol.appendChild(btnHapus);

        li.appendChild(spanTeks);
        li.appendChild(grupTombol);
        
        ulDataBuku.appendChild(li);
    });
}

// 3. Fungsi utama untuk menambahkan buku
function tambahBuku() {
    const nilaiBuku = inputBuku.value.trim();

    if (nilaiBuku === '') {
        alert('Mohon masukkan nama buku terlebih dahulu!');
        return;
    }

    daftarBuku.push(nilaiBuku);
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
    renderBuku();

    inputBuku.value = '';
    inputBuku.focus();
}

// 4. Fungsi untuk mengedit buku (Yang tadi kemungkinan terhapus)
function editBuku(index) {
    const bukuLama = daftarBuku[index];
    const bukuBaru = prompt('Edit nama buku:', bukuLama);

    if (bukuBaru !== null && bukuBaru.trim() !== '') {
        daftarBuku[index] = bukuBaru.trim();
        localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
        renderBuku();
    }
}

// 5. Fungsi untuk menghapus buku
function hapusBuku(index) {
    const yakin = confirm('Apakah kamu yakin ingin menghapus buku ini?');

    if (yakin) {
        daftarBuku.splice(index, 1);
        localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
        renderBuku();
    }
}

// 6. Event Listeners
btnTambah.addEventListener('click', tambahBuku);

inputBuku.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        tambahBuku();
    }
});

// 7. Render pertama kali saat halaman dimuat
renderBuku();