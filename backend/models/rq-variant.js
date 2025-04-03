"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqVariant extends Model {
		static associate(models) {
			this.belongsTo(models["RqOrder"]);
		}
	}

	RqVariant.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			orderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variantId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			attributes: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			}
		},
		{
			sequelize,
			modelName: "RqVariant",
			tableName: "rq_variant",
			freezeTableName: true,
			underscored: true
		}
	);

	return RqVariant;
};
