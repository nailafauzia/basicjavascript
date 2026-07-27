
const score = [90, 100, 64, 70, 80, 100];
for (let i = 0; i < score.length; i++) {
    if (score[i] >= 70) {
    console.log(`Nilai ${score[i]} -> Lulus`);
    } else {
        console.log(`Nilai ${score[i]} -> Tidak Lulus`)
    }

}