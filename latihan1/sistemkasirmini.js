const cart = [
  { name: "Mouse", price: 120000, qty: 2 },
  { name: "Keyboard", price: 250000, qty: 1 },
  { name: "Flashdisk", price: 90000, qty: 3 }
];

let totalBelanja = 0;

// Loop untuk menampilkan subtotal setiap barang
for (let i = 0; i < cart.length; i++) {
  let subtotal = cart[i].price * cart[i].qty;
  totalBelanja += subtotal;
  
  console.log(cart[i].name);
  console.log(`${cart[i].price} x ${cart[i].qty} = ${subtotal}`);
  console.log(""); // <-- BARIS BARU: Menambahkan spasi baris kosong setelah tiap produk
}

// Aturan Diskon
let diskon = 0;
if (totalBelanja > 500000) {
  diskon = totalBelanja * 0.1; // diskon 10%
} else {
  diskon = 0;
}

let totalBayar = totalBelanja - diskon;

// Menampilkan total akhir
console.log("-----------------------");
console.log(`Total Belanja : ${totalBelanja}`);
console.log(`Diskon        : ${diskon}`);
console.log(`Total Bayar   : ${totalBayar}`);