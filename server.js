const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).send({
        message: "Servidor funcionando"
    })
})

app.get('/', function(req, res){
    res.status(200).send({
        message: "Servidor funcionando"
    })
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ic3386941@gmail.com',
        pass: 'xnou rdhe pkzq iddf'
    }
});


app.post('/enviarformulario', async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Guardar datos en js
    let datos = [];
    if (fs.existsSync('./datos.js')) {
        delete require.cache[require.resolve('./datos.js')];
        datos = require('./datos.js');
    }
    datos.push({ nombre, email, mensaje });
    fs.writeFileSync('./datos.js', 'module.exports = ' + JSON.stringify(datos, null, 2) + ';');

    const mailOptions = {
        from: 'ic3386941@gmail.com',
        to: 'josedejesuszual2004@correo.com',
        subject: 'Nuevo formulario recibido',
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ mensaje: 'Correo enviado correctamente' });
        console.log('Correo enviado exitosamente')
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo', detalle: error.toString() });
    }
});


app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});

