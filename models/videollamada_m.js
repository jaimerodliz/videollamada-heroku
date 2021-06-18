const { Sequelize } = require('sequelize');
const db = require('../config/db');

const Videollamada = db.define('usuarios_video',{ 
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario :  Sequelize.INTEGER,
    api_key : Sequelize.STRING,
    status :  Sequelize.INTEGER
   
}, {
    freezeTableName: true
});

module.exports = Videollamada;