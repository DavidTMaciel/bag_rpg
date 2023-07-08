const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Itens = new Schema({
    nome:{
        type: 'string',
        require:true        
    },
    custo:{
        type: 'Number',
        require:true 
    },
    origem:{
        type: 'string',
        require:true        
    },
    descricao:{
        type: 'string',
    },
    quantidade:{
        type: 'Number',
    }
})