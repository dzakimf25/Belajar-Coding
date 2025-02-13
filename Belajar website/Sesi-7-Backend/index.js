const http = require ('http');
const host = "127.0.0.1"
const port = "3006"

const server = http.createServer(function(request, response) {
    const name ="Dzaki Miftah"
    const uang = 500000
    const jajan = 150000
    const sisa = uang - jajan;
    const hasil = "saya jajan sebanyak ${jajan}, uang saya tadinya ${uang}, sekarang menjadi ${sisa}"

    response.statusCode = 204;
    response.end("hasil");
});

server.listen (port, host, '', function (){
    console.log(`server menyala di ${host}: ${port}`);
});

server.listen(port, host, function () {
    console.log(`Server menyala di ${host}:${port}`);
}).on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} sudah digunakan! Coba port lain.`);
    } else {
        console.error('Terjadi error pada server:', err);
    }
});
