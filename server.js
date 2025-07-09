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

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});