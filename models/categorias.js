const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categorias = new Schema({
    nome:{
        type: 'string',
        require:true
    },
    img:{
        type: 'string',
        require:true
    },
    slug:{
        type: 'string',
        require:true
    }

});

mongoose.model('Categoria', Categorias);