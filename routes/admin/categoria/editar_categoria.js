const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/categorias')
const Categoria = mongoose.model('Categoria');

router.get('/', (req, res) => {
    res.render("../views/admin/categoria/admin");
});

router.put("/categorias/editar/:id", (req, res) => {
    //Pesquisando um registro que tenha um id = ao passado na rota
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render("admin/editcategorias", { categoria: categoria });
    }).catch((erro) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })

});

module.exports = router;