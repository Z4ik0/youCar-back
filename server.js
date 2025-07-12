const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const enviarCorreo = require("./utils/nodemailer.js");
const crearJson = require("./helpers/crearjson.js");

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Servidor funcionando",
  });
});

app.post("/bienvenida", async (req, res) => {
  let { email } = req.body;

  let subject = "Bienvenido, Gracias por suscribirte";
  let text = `Te has suscrito con el correo: ${email} a You-Car`
  let html = `<p>Gracias si deseas agendar un cita para visitarnos has <a href="www.youtube.com"> click aqui </a> </p>`
  try {
    await enviarCorreo(email, subject, text, html);
    res.status(200).send({
      message: "Correo enviado satisfactoriamente",
    });
  } catch (error) {
    res.status(500).send({
      message: `Error: ${error}`,
    });
  }
});

app.post("/enviarformulario", async (req, res) => {
  let { nombre, email, mensaje } = req.body;

  let subject = "Cita agendada"
  let text = "Agradecemos que hayas agendado una cita para poder visualizar nuestros autos, esperamos anciosamente tu visita"
  let html = "<h1>Te esperamos</h1> <p> Has agendado cita para el proximo 25/10/2025 a las 10:00 alli nos vemos </p>"

  
  try {
    await enviarCorreo(email);
    await crearJson(nombre, email, mensaje);
    res.status(200).send({
      message: "Correo enviado satisfactoriamente",
    });
  } catch (error) {
    res.status(500).send({
      message: `Error: ${error}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
