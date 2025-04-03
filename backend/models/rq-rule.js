"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqRule extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
		}
	}

	RqRule.init(
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
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			priority: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customerOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			customerIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			customerTags: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			productOption: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			variantIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			collectionIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			productTags: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			buttonId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			formId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			}
		},
		{
			sequelize,
			modelName: "RqRule",
			tableName: "rq_rule",
			freezeTableName: true,
			underscored: true
		}
	);

	return RqRule;
};
