const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();
const {API_PORT} = process.env;
const addCategorias= require('./routes/admin/categoria/cadastrar_categoria')
const listarCategorias= require('./routes/admin/categoria/listar_categorias')
const editarCategoria = require('./routes/admin/categoria/editar_categoria')
const deletarCategorias= require('./routes/admin/categoria/deletar_categoria');
const addBag = require('./routes/admin/bag/addbag');
const listarBag = require('./routes/admin/bag/listar_bag');
const addIten = require('./routes/admin/bag/add_itens');
const listarItens = require('./routes/admin/bag/listar_itens');
require("./config/auth")(passport)


const app = express();
const port = process.env.PORT || API_PORT;

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

//BodyParser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

//Middleware
    app.use((req,res , next) =>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.user = req.user || null; //Armazenado dos dados do usario autenticado
        next();
    })
//Mongose
mongoose.Promise = global.Promise
mongoose.connect(
    process.env.MONGO_URI || "mongodb://0.0.0.0:27017/bags", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then( () => {
        console.log("Connected to MongoDB");
        
    }).catch(function(erro){
        console.log(erro);
    }); 


app.use('/admin', addCategorias);
app.use('/admin', listarCategorias)
app.use('/admin', editarCategoria);
app.use('/admin', deletarCategorias);
app.use('/admin',addBag);
app.use('/admin', listarBag);
app.use('/admin', addIten);
app.use('/admin', listarItens)

app.get('/', (req, res) => {
    res.render("index")
});

app.listen(port, ()=>{console.log('Server listening on port'+port)})
