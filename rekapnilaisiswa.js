const students = [
  { name: "Andi", score: 90 },
  { name: "Budi", score: 65 },
  { name: "Caca", score: 80 },
  { name: "Dina", score: 55 }
];

// Variable tracker untuk kebutuhan statistik di akhir
let jumlahSiswa = students.length;
let lulusCount = 0;
let tidakLulusCount = 0;
let totalSkor = 0;

// Perulangan untuk memproses data tiap siswa
for (let i = 0; i < students.length; i++) {
  const currentStudent = students[i];
  let grade = "";
  
  // Aturan penentuan Grade
  if (currentStudent.score >= 90 && currentStudent.score <= 100) {
    grade = "A";
  } else if (currentStudent.score >= 80 && currentStudent.score < 90) {
    grade = "B";
  } else if (currentStudent.score >= 70 && currentStudent.score < 80) {
    grade = "C";
  } else {
    grade = "D";
  }

  // Aturan Kelulusan & menghitung statistik
  if (currentStudent.score >= 70) {
    lulusCount++;
  } else {
    tidakLulusCount++;
  }
  
  totalSkor += currentStudent.score;

  // Menampilkan info detail per siswa
  console.log(`Nama: ${currentStudent.name}`);
  console.log(`Nilai: ${currentStudent.score}`);
  console.log(`Grade: ${grade}`);
  console.log(""); // Baris kosong pemisah
}

// Menghitung rata-rata skor
let rataRata = totalSkor / jumlahSiswa;

// Menampilkan output ringkasan/rekap total
console.log("=====================");
console.log(`Jumlah Siswa : ${jumlahSiswa}`);
console.log(`Lulus        : ${lulusCount}`);
console.log(`Tidak Lulus  : ${tidakLulusCount}`);
console.log(`Rata-rata    : ${rataRata.toFixed(1)}`);