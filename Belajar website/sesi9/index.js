const myName ="Dzaki Miftah"
let myAddress ="Nurul Amal Fajar Baru"
let i = 0;


console.log (myName);
console.log (myAddress);

function getDetail (){
    i += 1
    if (i>5) {
        console.log('lebih dari 5x di klik')
    } else {
        console.log ('jatah klik masih ada')
    }
}

// arrow function lain
const getDetail1 = () => {
    i += 1
    i > 5 ? console.log ('lebih dari 5x bro detail 2'): console.log ('jatah masih ada detail 2')
}



// atau bisa cara gini
const myName1 ="Rida Luay"
let myAddress1

function getDetailHuman (data1, data2){
    console.log (`nama saya  adalah ${data1} dan rumah saya ada di  ${data2}`)
}
myAddress1 = "jalan pungkur..."
getDetailHuman(myName1, myAddress1)



// beda lagi nih
const mahasiswa = [
{
    nama: "dzaki miftah",
    alamat: "nurul amal",
    usia: 22,
    pekerjaan: "project manager",
},
{
    nama: "rida luay sari",
    alamat: "nurul soleh",
    usia: 23,
    pekerjaan: "project marketing",
}
]

function getDetailDatas () {
    mahasiswa.map (function (result,i ){
        console.table (result)
    })
    
    // console.log(`data yang anda cari adalah ${}`)
}


// beda lagi nih
class Hewan {
    warna
    kemampuan
    constructor (nama){
    this.nama = nama    
    }
    set newColor (color) {
        this.warna = color
    }
    set newSkill (skill) {
        this.kemampuan = skill
    }
    get detail () {
        return `hi nama saya ${this.nama}, saya berwarna ${this.warna} dan kemampuan saya ${this.kemampuan}`
    }
}

const kucing = new Hewan ("jojo")
kucing.newColor = "red"
kucing.newSkill = "jago manjat"
console.log (kucing.detail)