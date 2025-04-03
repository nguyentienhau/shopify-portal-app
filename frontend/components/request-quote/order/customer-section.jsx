import { Card, InlineStack, Button, Text } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";

export function CustomerSection() {
	return (
		<Card>
			<InlineStack gap="200" wrap={false} align="space-between" blockAlign="center">
				<Text variant="headingMd">Customer</Text>
				<Button variant="plain" icon={EditIcon} onClick={() => {}} />
			</InlineStack>
			<InlineStack gap="200" wrap={false} align="space-between" blockAlign="center">
				<Text variant="headingMd">Shipping Address</Text>
				<Button variant="plain" icon={EditIcon} onClick={() => {}} />
			</InlineStack>
		</Card>
	);
}
