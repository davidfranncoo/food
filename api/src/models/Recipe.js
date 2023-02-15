const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type :DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image:{
      type:DataTypes.STRING,
      //allowNull:false
    },
    diets:{
      type: DataTypes.ARRAY(DataTypes.JSON()),
      allowNull:false
    },
    dish_summary:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    health_score:{
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    steps:{
      //! FORMA DE DECIR QUE VOY A GUARDAR ARRAY CON OBJETOS

      type: DataTypes.ARRAY(DataTypes.JSON()),
      //allowNull: false,

    },
  });


};

