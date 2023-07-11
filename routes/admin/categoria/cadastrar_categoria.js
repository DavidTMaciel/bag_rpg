const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/categorias')
const Categoria = mongoose.model('Categoria');

router.get('/', (req, res) => {
    res.render("../views/admin/categoria/admin");
});

router.get('/categorias/add', (req,res)=>{
    res.render('admin/categoria/addcategorias');
});

router.post('/categorias/nova', (req,res)=>{
    let erros = [];


    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ text: "Nome invalido" });
        console.log(erros);
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ text: "Slug invalido" })
    }
    if (!req.body.img || typeof req.body.img == undefined || req.body.img == null) {
        erros.push({ text: "Img invalida" })
    }
    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    }
    else{
         const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
            img: req.body.img
         }
         new Categoria(novaCategoria).save().then(() => {
            req.flash("sucess_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
         }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria")
            res.redirect("/admin/categorias")
         })
    }
});

module.exports = router ;
