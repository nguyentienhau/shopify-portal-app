import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FullscreenBar, InlineStack, Button, Text } from "@shopify/polaris";
import { AdjustIcon, ButtonIcon, FileIcon } from "@shopify/polaris-icons";
import {
	GeneralSetting,
	ButtonSetting,
	ButtonPreview,
	FormSetting,
	FormPreview
} from "@/components/request-quote/rule";
import styles from "@/styles/request-quote/rule.css";

export default function Rule() {
	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleBack() {
		navigate("/request-quote");
	}

	function handleTabSelect(value) {
		setSelectedTab(value);
	}

	const tabs = useMemo(function () {
		return [
			{
				id: "general",
				icon: AdjustIcon,
				content: "General",
				setting: <GeneralSetting />,
				preview: <ButtonPreview />
			},
			{
				id: "button",
				icon: ButtonIcon,
				content: "Button",
				setting: <ButtonSetting />,
				preview: <ButtonPreview />
			},
			{
				id: "form",
				icon: FileIcon,
				content: "Form",
				setting: <FormSetting />,
				preview: <FormPreview />
			}
		];
	}, []);

	return (
		<div className={styles.rulePage}>
			<FullscreenBar onAction={handleBack}>
				<div className={styles.ruleHeader}>
					<Text variant="headingLg">Add Rule</Text>
				</div>
			</FullscreenBar>
			<InlineStack>
				<div className={styles.ruleButton}>
					{tabs.map(function (tab, index) {
						return (
							<Button
								key={tab.id}
								icon={tab.icon}
								variant={selectedTab === index ? "plain" : "monochromePlain"}
								onClick={() => handleTabSelect(index)}
							>
								{tab.content}
							</Button>
						);
					})}
				</div>
				<div className={styles.ruleSetting}>{tabs[selectedTab].setting}</div>
				<div className={styles.rulePreview}>{tabs[selectedTab].preview}</div>
			</InlineStack>
		</div>
	);
}
