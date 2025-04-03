"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgExport extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
		}
	}

	AgExport.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			sendFrom: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			template: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: ""
			}
		},
		{
			sequelize,
			modelName: "AgExport",
			tableName: "ag_export",
			freezeTableName: true,
			underscored: true
		}
	);

	return AgExport;
};
