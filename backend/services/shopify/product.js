"use strict";

const { PRODUCT_GRAPHQL_FIELD } = require("constants");

module.exports = {
	read: async function (client, body) {
		try {
			const response = await client.request(`${PRODUCT_GRAPHQL_FIELD}`, { variables: { input: body } });
			return { success: true, data: response.data, message: "Read successfully" };
		} catch (error) {
			return { success: true, error, message: "Read failed" };
		}
	},
	upsert: async function (client, body) {
		try {
			const response = await client.request(`${PRODUCT_GRAPHQL_FIELD}`, { variables: { input: body } });
			return { success: true, data: response.data, message: "Save successfully" };
		} catch (error) {
			return { success: true, error, message: "Save failed" };
		}
	},
	delete: async function (client, body) {
		try {
			const response = await client.request(`${PRODUCT_GRAPHQL_FIELD}`, { variables: { input: body } });
			return { success: true, data: response.data, message: "Delete successfully" };
		} catch (error) {
			return { success: true, error, message: "Delete failed" };
		}
	}
};
