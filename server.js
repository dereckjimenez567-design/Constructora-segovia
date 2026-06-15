/* ===================================================================
   Mini-servidor local para Constructora Segovia
   No requiere internet ni instalar nada: usa solo Node.js.
=================================================================== */
const http = require("http");
const fs = require("fs");
const path = require("path");

// En la nube (Railway, etc.) el puerto lo asigna la plataforma vía process.env.PORT.
// En local usa 8080.
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  // Evitar salir de la carpeta del proyecto
  const filePath = path.join(ROOT, path.normalize(urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Acceso denegado");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404 - Pagina no encontrada</h1>");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log("====================================================");
  console.log("  Constructora Segovia - Servidor iniciado");
  console.log("====================================================");
  console.log("");
  console.log("  Escuchando en el puerto " + PORT);
  console.log("  Local:  http://localhost:" + PORT);
  console.log("");
  console.log("  Para DETENER el servidor: cierre esta ventana");
  console.log("  o presione Ctrl + C");
  console.log("");
});
