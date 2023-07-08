const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bags = new Schema({
    nome:{
        typeof: 'string',
        require:true
    },
    espaco:{
        type: 'Number',
        require:true
    },
    itens:{
        type: 'String',
    },
    img:{
        type: 'String',
        require: true
    }
})

mongoose.model('Bag', Bags);