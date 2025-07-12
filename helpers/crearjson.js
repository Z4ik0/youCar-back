const fs = require("fs");
const path = require("path");

const crearJson = (nombre, email, mensaje) => {
  const filePath = path.join(__dirname, "../data/datos.json");

  let datos = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, "utf8");
    try {
      datos = JSON.parse(rawData);
    } catch (err) {
      console.error("Error al parsear JSON:", err);
    }
  }

  datos.push({ nombre, email, mensaje });

  fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
};

module.exports = crearJson;
