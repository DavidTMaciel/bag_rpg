const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/bag')
const Bag = mongoose.model('Bag');


router.get('/', (req, res) => {
    res.render("../views/admin/bag/admin");
});

router.get('/bag/add', (req,res)=>{
    res.render('admin/bag/addbag');
});

router.post('/bag/nova', (req,res)=>{
    let erros = [];


    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ text: "Nome invalido" });
        console.log(erros);
    }
    if (!req.body.espaco || typeof req.body.espaco == undefined || req.body.espaco  == null) {
        erros.push({ text: "Slug invalido" })
    }
    if (!req.body.img || typeof req.body.img == undefined || req.body.img == null) {
        erros.push({ text: "Img invalida" })
    }
    if (erros.length > 0) {
        res.render("admin/bag/addbag", { erros: erros })
    }
    else{
         const novaBag = {
            nome: req.body.nome,
            espaco: req.body.espaco,
            itens: req.body.itens,
            img: req.body.img
         }
         new Bag(novaBag).save().then(() => {
            req.flash("sucess_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/bag")
         }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria")
            res.redirect("/admin/bag")
         })
    }
});

module.exports = router ;