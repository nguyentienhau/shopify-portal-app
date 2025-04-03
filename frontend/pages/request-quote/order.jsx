import { useNavigate } from "react-router-dom";
import { Page, Layout, BlockStack } from "@shopify/polaris";
import { VariantTable, CustomerSection, PaymentSection, RequestForm } from "@/components/request-quote/rule";

export default function Order() {
	const navigate = useNavigate();

	function handleBack() {
		navigate("/request-quote");
	}

	return (
		<Page title="Add Order" backAction={{ onAction: handleBack }}>
			<Layout>
				<Layout.Section>
					<BlockStack gap="400">
						<VariantTable />
						<PaymentSection />
					</BlockStack>
				</Layout.Section>
				<Layout.Section variant="oneThird">
					<BlockStack gap="400">
						<CustomerSection />
						<RequestForm />
					</BlockStack>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
