const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.ENUM("1", "2" , "3" , "4" , "5")
            // type: DataTypes.ENUM,
            // values: ['1', '2', '3', '4', '5']
        },
        length: {
            type: DataTypes.INTEGER
        },
        season: {
            type: DataTypes.ENUM('Summer','Autumn', 'Winter','Spring'),
            // type: DataTypes.ENUM,
            // values: ['Any', 'Summer', 'Winter', 'Autumn', 'Spring']
        },
    },{
        timestamps: false
      });

}