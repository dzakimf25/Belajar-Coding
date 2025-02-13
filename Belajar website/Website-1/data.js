const nama = 'Dzaki Miftah Farid';
let umur = 23;
let lahirtahun = 2002;
console.log("Nama saya adalah " + nama + " dan umur saya adalah " + umur + " serta saya lahir tahun " + lahirtahun);
console.log("nama saya itu", nama, "dan umur saya juga", umur, "saya lahir tahun", lahirtahun);

{// Cara Satu//
const Pacar = 'Rida Luay Sari';
let umurPacar = 33;
let rupaPacar = 'Cantik';
console.log("Pacar saya adalah " + Pacar + " dan umur pacar saya adalah " + umurPacar + " serta pacar saya " + rupaPacar); 
function generateBiodata() {
    if (umurPacar > 18 && umurPacar < 23) {
        console.log('Pacar saya masih remaja');
    }
    else if (umurPacar > 25 && umurPacar < 30) {
        console.log('Pacar saya masih muda');
    }
    else if (umurPacar > 30) {
        console.log('Pacar saya sudah tua banget');
    } 
    else {
        console.log('bingung pacar saya umurnya berapa ya?');
    }
}
generateBiodata();
}


{// Cara Dua Pake Return//
const Pacar1 = 'Rida Luay Sari';
let umurRida = 24;
//ini fungsi manggil ke html, klo ga bisa diapus dibawahnya kasih return consolelog//
let biodata = document.getElementById('biodata');

function generateBiodata() {
    let generasi;

    if (umurRida > 18 && umurRida < 24) {
        generasi = "generasi remaja";
    }
    else if (umurRida >= 24 && umurRida < 30) {
        generasi = "generasi dewasa";
    }
    else if (umurRida > 30) {
        generasi = "generasi boomer"
    } 
    else {
        generasi = "generasi bayi kali hahah";
    }

return biodata.innerHTML = generasi
}

generateBiodata(); }