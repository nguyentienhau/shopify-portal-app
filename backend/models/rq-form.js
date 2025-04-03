"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class RqForm extends Model {
		static associate(models) {
			this.belongsTo(models["AgUser"]);
		}
	}

	RqForm.init(
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
			productSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			},
			formFields: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			formSettings: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			},
			formStyles: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: {}
			},
			formCustomize: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: ""
			}
		},
		{
			sequelize,
			modelName: "RqForm",
			tableName: "rq_form",
			freezeTableName: true,
			underscored: true
		}
	);

	return RqForm;
};
