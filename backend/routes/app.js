"use strict";

const { authenticate } = require("middlewares");
const serviceMethods = ["read", "upsert", "delete"];
const requestPaths = [
	"/app-general/user",
	"/app-general/discount",
	"/app-general/email",
	"/app-general/export",
	"/request-quote/rule",
	"/request-quote/button",
	"/request-quote/form",
	"/request-quote/order",
	"/request-quote/variant",
	"/request-quote/log"
];

module.exports = requestPaths.map(function (requestPath) {
	return {
		url: requestPath,
		handler: async function (request, response) {
			try {
				const result = await authenticate(request);

				if (result.success) {
					const service = require("services" + requestPath);
					const { type = "read", ...requestData } = request.body;

					if (serviceMethods.includes(type)) {
						const result = await service[type](requestData);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} else {
					response.status(200).send(result);
				}
			} catch (error) {
				response.status(200).send({ success: false, error, message: "Handle failed" });
			}
		}
	};
});
