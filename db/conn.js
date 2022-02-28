const Sequelize = require('sequelize');

const sequelize = new Sequelize( 'toughts2' , 'root' , 'Saneto@044', {
    host:'localhost',
    dialect:'mysql',
})

try {
    sequelize.authenticate()
    console.log('banco conectado com sucesso!!!')
} catch (error) {
    console.log('banco não foi conectado' + error)
}

module.exports = sequelize