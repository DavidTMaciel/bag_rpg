const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/categorias')
const Categoria = mongoose.model('Categoria');

router.get('/', (req, res) => {
    res.render("../views/admin/categoria/admin");
});

router.get("/categorias/editar/:id", (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render("admin/categoria/editcategorias", { categoria: categoria });
    }).catch((erro) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categoria/categoria")
    })
});

router.post("/categorias/editar", (req, res) => {
    Categoria.findOne({ _id: req.body.id }).then((categoria) => {

        categoria.nome = req.body.nome; //Pegando o campo nome e atribuindo
        categoria.slug = req.body.slug;
        categoria.img = req.body.img;

        //Validação da edição

        let erros = [];

        if(!req.body.nome && typeof req.body.nome == undefined && req.body.slug == null){
            erros.push({text: 'Nome invalido'})
        }
        if(req.body.slug && typeof req.body.slug == undefined && req.body.slug == null){
            erros.push({text: 'Slug invalido'})
        }
        if(req.body.img && typeof req.body.img == undefined && req.body.img == null){
            erros.push({text: 'Link invalido'})
        }else{
            categoria.save().then(() => {
                req.flash("success_msg", "Categoria editada com sucesso");
                res.redirect("/admin/categorias");
    
            }).catch((erro) => {
                req.flash("error_msg", "Houve um erro interno ao salvar a edição categoria" + erros);
                res.redirect("/admin/categorias");
                console.log(erro);
            })
        }
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias");
        console.log(erro);
    })
});

module.exports = router;