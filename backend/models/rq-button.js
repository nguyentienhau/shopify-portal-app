"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqButton extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
		}
	}

	RqButton.init(
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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			buttonSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			},
			buttonStyles: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			},
			buttonCustomize: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: ""
			}
		},
		{
			sequelize,
			modelName: "RqButton",
			tableName: "rq_button",
			freezeTableName: true,
			underscored: true
		}
	);

	return RqButton;
};
