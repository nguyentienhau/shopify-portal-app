import { useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export function useCustomFetch() {
	const shopify = useAppBridge();

	return useCallback(async function (path = "", body = {}) {
		try {
			const sessionToken = await shopify.idToken();
			const response = await fetch("/api" + path, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Session-Token": sessionToken
				},
				body: JSON.stringify(body)
			});

			if (response.status === 200 && response.ok) {
				return await response.json();
			} else {
				return { success: false, message: "Fetch failed" };
			}
		} catch (error) {
			return { success: false, error, message: "Fetch failed" };
		}
	}, []);
}
