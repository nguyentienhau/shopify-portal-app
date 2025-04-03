"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqLog extends Model {
		static associate(models) {
			this.belongsTo(models["RqOrder"]);
		}
	}

	RqLog.init(
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
			type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["status", "variant", "customer", "address"],
				defaultValue: "status"
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: ""
			}
		},
		{
			sequelize,
			modelName: "RqLog",
			tableName: "rq_log",
			freezeTableName: true,
			underscored: true
		}
	);

	return RqLog;
};
