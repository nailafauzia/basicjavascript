const products = [
  {
    name: "Indomie",
    price: 3500,
    stock: 10
  },
  {
    name: "Susu",
    price: 18000,
    stock: 0
  },
  {
    name: "Roti",
    price: 12000,
    stock: 5
  }
];

// Perulangan untuk membaca object di dalam array
for (let i = 0; i < products.length; i++) {
  console.log(products[i].name);
  console.log(`Harga: ${products[i].price}`);
  
  // Penentuan status berdasarkan stock
  if (products[i].stock > 0) {
    console.log("Status: Tersedia");
  } else {
    console.log("Status: Habis");
  }
  
  // Memberikan baris kosong antar produk agar rapi di console
  console.log(""); 
}