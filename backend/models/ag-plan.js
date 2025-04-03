"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class AgPlan extends Model {
		static associate(models) {
			const options = { foreignKey: "planId", onDelete: "SET DEFAULT", onUpdate: "CASCADE" };
			this.hasMany(models["AgUser"], options);
		}
	}

	AgPlan.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			code: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			version: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
			}
		},
		{
			sequelize,
			modelName: "AgPlan",
			tableName: "ag_plan",
			freezeTableName: true,
			underscored: true
		}
	);

	return AgPlan;
};
