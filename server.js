const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3017;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Setăm tipul de conținut corect pentru fișierele CSS și JavaScript
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.jpg':
        case '.jpeg':
        case '.png':
            contentType = 'image/jpeg'; // Poți schimba în 'image/png' dacă ai imagini PNG
            break;
    }

    // Dacă calea nu conține o extensie, adăugăm extensia .html
    if (contentType === 'text/html' && req.url === '/') {
        filePath = './Pagina_de_start.html'; // Aici poți specifica pagina de start a aplicației tale
    }

    // Citim și servim fișierul solicitat
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Fișierul nu a fost găsit
                res.writeHead(404);
                res.end('Pagina nu a fost găsită!');
            } else {
                // Alte erori
                res.writeHead(500);
                res.end(`Eroare internă: ${err.code}`);
            }
        } else {
            // Am găsit fișierul, trimitem răspunsul cu conținutul corespunzător
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
