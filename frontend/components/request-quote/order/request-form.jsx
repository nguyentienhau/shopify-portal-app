import { Card, InlineStack, Button, Text } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";

export function RequestForm() {
	return (
		<Card>
			<InlineStack gap="200" wrap={false} align="space-between" blockAlign="center">
				<Text variant="headingMd">Request Form</Text>
				<Button variant="plain" icon={EditIcon} onClick={() => {}} />
			</InlineStack>
		</Card>
	);
}
