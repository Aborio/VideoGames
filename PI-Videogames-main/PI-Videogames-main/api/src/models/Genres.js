const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    
     sequelize.define('genres', {
    
     id: {
        type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
     },
    
     name: {
        type: DataTypes.STRING,
        allowNull: false,
     },
    
    }
    )};