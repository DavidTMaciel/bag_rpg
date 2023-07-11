const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('../../../models/bag')
const Bag = mongoose.model('Bag');

router.get('/', (req, res) => {
    res.render("../views/admin/bag/admin");
});

router.get('/bag', (req, res) => {
    Bag.find().lean().then((bag)=>{
        res.render("admin/bag/bag", {bag: bag})
    }).catch((err) => {
        req.flash('error', "Houve um erro ao registar a categoria");
        res.redirect("/admin")
    });
});

module.exports = router;