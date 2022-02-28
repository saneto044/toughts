const {DataTypes} = require('sequelize');
const User = require('./User')
const db = require('../db/conn');

const Tought = db.define('Tought', {

    title:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought