const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/categorias')
const Categoria = mongoose.model('Categoria');

router.get('/', (req, res) => {
    res.render("../views/admin/categoria/admin");
});

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).then(() => {
        req.flash("succes_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categoria/categorias")
    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria")
        res.redirect("/admin/categoria/categorias")
    })
});

module.exports = router;