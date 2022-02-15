
const Sequelize = require('sequelize');
const database = require('../database/db');

const User = database.define('user', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
})

module.exports = User;