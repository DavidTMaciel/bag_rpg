const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/bag')
require('../../../models/itens')
const Bag = mongoose.model('Bag');
const Itens = mongoose.model('Itens');


router.get('/', (req, res) => {
    res.render("../views/admin/bag/admin");
});

router.get('/bag/adicionar/:id', (req, res) => {
    const bagId = req.params.id;
    Bag.findOne({_id: bagId}).lean().then((bag) =>{
        if (!bag) {
            req.flash("error_msg", "Sacola não encontrada");
            return res.redirect("/admin/bag");
        }
        else{
            res.render("admin/bag/bag_itens", { bagId: bagId }); // Passar o bagId como variável para o template
        }
        
    }).catch((err) => {
        res.render("/admin/bag")
    });
    
});

router.post('/bag/adicionar', (req, res) => {
    const bagId = req.body.id;
    console.log(req.body.id);
    Bag.findById(bagId).then((bag) =>{
        console.log(bag)
        if(!bag){
            req.flash("error_msg", "Sacola não encontrada 2");
            return res.redirect("/admin/bag");
            
        }else{
           

            let erros = [];

            if (!req.body.itens || req.body.itens === undefined || req.body.itens === null) {
                erros.push({ text: "Item inválido" });
            
            }
            if (erros.length > 0) {
                req.flash("error_msg", "Item inválido");
                return res.redirect("/admin/bag");

            }else{

                const itens = new Itens({
                    nome: req.body.nome,
                    custo: req.body.custo,
                    origem: req.body.origem,
                    descricao: req.body.descricao,
                    quantidade: req.body.quantidade
                })

                bag.itens.push(itens); // Associa o novo item à bag

                return Promise.all([itens.save(), bag.save()])
                .then(()=>{
                    req.flash("success_msg","Item salvo com sucesso")
                    res.redirect("/admin/bag");
                    return bag.save;
                }).catch((err)=>{
                    req.flash("error_msg","Erro interno ao salvar o item");
                    res.redirect("/admin/bag");
                })
                
            }
        }


           
        }).catch((err)=>{
            req.flash("error_msg","Erro interno");
            res.redirect("/admin/bag");
            console.log(err);
        });
    });


module.exports = router;