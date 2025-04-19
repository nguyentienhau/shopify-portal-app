"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ag_user", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			domain: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			plan_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			charge_id: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			recharge_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		});
	},
	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("ag_user");
	}
};
