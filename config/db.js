const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sie7', 'sie7', '8Fr7D5rN7contabilidadh6hWSvW8CYDz4ZfJHMWCqL8N', {
    host: '192.241.200.182',
    dialect: 'postgres',
    define:{
        timestamps:false
    }
});

module.exports = sequelize;