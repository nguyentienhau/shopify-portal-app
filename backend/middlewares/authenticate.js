const jwt = require("jsonwebtoken");
const { AgUser } = require("models");

export async function authenticate(request) {
	try {
		const sessionToken = request.headers["Session-Token"];
		const secretKey = process.env.SHOPIFY_API_SECRET_KEY;
		const decoded = jwt.verify(sessionToken, secretKey);
		const domain = decoded.dest?.replace(/https:\/\/|\/$/g, "");
		const userId = request.body.userId;
		const user = await AgUser.findOne({ where: { id: userId, domain } });

		if (user && user.id && user.status) {
			return { success: true };
		} else {
			return { success: false, message: "User not found" };
		}
	} catch (error) {
		return { success: false, error, message: "Authenticate failed" };
	}
}
