const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/bag')
require('../../../models/itens')
const Itens = mongoose.model('Itens');
const Bag = mongoose.model('Bag');


router.get('/', (req, res) => {
    res.render("../views/admin/bag/admin");
});

router.get('/bag/listar/itens/:id', (req, res) => {
    const bagId = req.params.id;

    Bag.findById(bagId)
        .populate('itens')
        .lean()
        .then((bag) => {
            if (!bag) {
                req.flash("error_msg", "Sacola não encontrada");
                return res.redirect("/admin/bag");
            } else {
                const itens = bag.itens;
                if(!itens){
                    console.log("erro")
                    console.log(itens);
                }else{
                    res.render("admin/bag/bag_itens", { bagId: bagId, itens: bag.itens });
                }                
                
            }
            
        })
        .catch((err) => {
            req.flash('error', "Ocorreu um erro ao acessar sua mochila, entre em contato com o administrador.");
            res.redirect("/admin/bag");
        });
});

module.exports = router;