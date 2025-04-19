"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ag_export", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			send_from: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			template: {
				type: Sequelize.TEXT,
				allowNull: false,
				defaultValue: ""
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
		await queryInterface.dropTable("ag_export");
	}
};
