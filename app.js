const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const API_PORT = process.env;
//Instanciando
const app = express();
const port = process.env.PORT || API_PORT;

app.get('/', (req, res) => {
    res.render()
});

app.listen(port, ()=>{console.log('Server listening on port'+port)})
