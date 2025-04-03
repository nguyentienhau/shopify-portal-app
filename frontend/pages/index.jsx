import { Card, Page, Link, Text } from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";

export default function Index() {
	const { t } = useTranslation();

	return (
		<Page title={t("HomePage.title")}>
			<Card sectioned>
				<Text as="h2" variant="headingMd">
					{t("HomePage.heading")}
				</Text>
				<Trans
					i18nKey="HomePage.yourAppIsReadyToExplore"
					components={{
						PolarisLink: <Link url="https://polaris.shopify.com/" external />,
						AdminApiLink: <Link url="https://shopify.dev/api/admin-graphql" external />,
						AppBridgeLink: <Link url="https://shopify.dev/apps/tools/app-bridge" external />
					}}
				/>
				<Trans
					i18nKey="HomePage.learnMore"
					components={{
						ShopifyTutorialLink: (
							<Link url="https://shopify.dev/apps/getting-started/add-functionality" external />
						)
					}}
				/>
			</Card>
		</Page>
	);
}
