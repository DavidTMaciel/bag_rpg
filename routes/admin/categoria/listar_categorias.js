const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/categorias')
const Categoria = mongoose.model('Categoria');

router.get('/', (req, res) => {
    res.render("../views/admin/categoria/admin");
});

router.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias)=>{
        res.render("admin/categoria/categoria", {categorias: categorias})
    }).catch((err) => {
        req.flash('error', "Houve um erro ao registar a categoria");
        res.redirect("/admin")
    });
});

module.exports = router;