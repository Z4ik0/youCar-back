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

let email;

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Servidor funcionando",
  });
});

app.post("/suscribe", async (req, res) => {
  let { email } = req.body;

  console.log(`::::::::: Se recibio el email: ${email}:::::::::::`);

  let subject = "Bienvenido, Gracias por suscribirte";
  let text = `Te has suscrito con el correo: ${email} a You-Car`;
  let html = `
   <div
      style="
        box-sizing: border-box;
        margin: 0;
        padding: 50px;
        background-image: url(https://i.postimg.cc/jSH1VcPb/Fondo-1.jpg);
        width: 500px;
        height: 750px;
        border-radius: 30px;
        font-family: Georgia, serif;
        color: white;
      "
    >
      <div
        style="
        width: 300px;
        margin: 0 auto;
        position: relative;
        "
      >
        <p style="font-size: 40px; margin: 0 0 0 20px; text-align: start; font-weight: 600;">
          Bienvenidos
        </p>
        <p style="font-size: 40px; margin: 0; text-align: center">a</p>
        <p style="color: rgb(79, 139, 235); font-size: 50px; text-align: start; margin: 0; font-weight: bold;">TROCAS</p>
        <p style="text-align: end; font-size: 50px; color: rgb(79, 139, 235); margin: 0; font-weight: bold;">SAN JÓSE</p>
        <p style="text-align: center; font-size: 120px; margin: 0; font-weight: bold; ">1,286</p>
        <p style="font-size: 26px; text-align: center; font-weight: bold;">AUTOS EN NUESTRO CATALOGO</p>
        <button style="background-color: blue; border-radius: 20px; padding: 10px 20px; margin-top: 20px;" type="button"><a style="text-decoration: none; font-size: 30px; font-weight: bold; color: white;" href="http://localhost:5173">AGENDA AHORA</a></button>
      </div>
    </div>
  `;

  let emailenterprise = "ic3386941@gmail.com";
  let subjectenterprise = "Nuevo usuario suscrito";
  let textenterprise = `Probando`;
  let htmlenterprise = `<p> El usuario ${email} se acaba de suscribir a nuestro sitio <p>`;
  try {
    await enviarCorreo(email, subject, text, html);
    await enviarCorreo(
      emailenterprise,
      subjectenterprise,
      textenterprise,
      htmlenterprise
    );
    res.status(200).send({
      message: "status: 200, Correo enviado satisfactoriamente",
    });
  } catch (error) {
    res.status(500).send({
      message: `Status: 500, ${error}`,
    });
  }
});

app.post("/enviarformulario", async (req, res) => {
  // let { nombre, apellidos, telefono } = req.body;
  /*
  let subject = "Cita agendada";
  let html = `
   <div style="box-sizing: border-box; text-align: center; font-weight: bold; color: white; font-family: Georgia, serif; letter-spacing: 3px; font-size: 20px; background-image: url('https://i.postimg.cc/wj8rbZt2/Fondo-2.jpg'); background-position: center; background-size: cover; background-repeat: no-repeat; width: 500px; height: 100vh; border-radius: 30px; padding: 20px; ">
        <img src="https://i.postimg.cc/TYgxwrgk/IMG-4837.png" alt="Gracias por agendar tu cita" style="width: 80%; height: 50%; margin: 20px auto 40px auto;">
        <div style="text-align: start; display: grid; grid-template-columns: 100px auto; grid-template-rows: auto auto auto; gap: 20px; justify-content: start;">
            <span style="color: blue;">Dia:</span>
            <span>October 25, 2025</span>
            <span style="color: blue;">Hora:</span>
            <span>10:00pm</span>
            <span style="color: blue;">Motivo: </span>
            <span>Visita al concecionario</span>
        </div>
    </div>
  `;
  */
  

  // datos para correo de la empresa
  let emailempresa = 'ic3386941@gmail.com';
  let subjectempresa = `Nuevo cita agendada por el usuriario:`;
  let htmlempresa = `<p> Nueva cita registrada datos del usuario nombre:  apellidos:  telefono: </p>`;

  try {
    // await enviarCorreo(email, subject, html);
    await enviarCorreo(emailempresa, subjectempresa, htmlempresa);
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
