const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuarios = new Schema({
    nome:{
        type: 'string',
        require:true
    },
    senha:{
        type: 'string',
        require:true
    },
    eAdmin:{
        type: 'string',
        default:0
    }

});

mongoose.model('Usuario', Usuarios);