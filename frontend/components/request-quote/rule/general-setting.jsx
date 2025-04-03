import { useSelector, useDispatch } from "react-redux";
import { BlockStack, TextField, Select, Text, Checkbox } from "@shopify/polaris";
import { CustomerCondition, ProductCondition } from "@/components/condition";

export function RuleGeneral() {
	const dispatch = useDispatch();
	const rule = useSelector((state) => state.requestQuote.rule);

	function handleRuleAttributesChange(data) {
		dispatch("CHANGE_RULE_ATTRIBUTES", data);
	}

	return (
		<BlockStack gap="300">
			<BlockStack gap="200">
				<Text variant="headingMd">General settings</Text>
				<TextField
					label="Name"
					value={rule.name}
					onChange={(value) => handleRuleAttributesChange({ name: value })}
				/>
				<Select
					label="Status"
					options={[
						{ label: "Enable", value: true },
						{ label: "Disable", value: false }
					]}
					value={rule.status}
					onChange={(value) => handleRuleAttributesChange({ status: value === "true" })}
				/>
				<TextField
					label="Name"
					type="number"
					min="0"
					max="99"
					value={rule.priority}
					onChange={(value) => handleRuleAttributesChange({ priority: Number(value) })}
				/>
			</BlockStack>
			<BlockStack gap="200">
				<Text variant="headingMd">Customer conditions</Text>
				<CustomerCondition
					value={{
						customerOption: rule.customerOption,
						customerIds: rule.customerIds,
						customerTags: rule.customerTags
					}}
					onChange={handleRuleAttributesChange}
				/>
			</BlockStack>
			<BlockStack gap="200">
				<Text variant="headingMd">Product conditions</Text>
				<ProductCondition
					value={{
						productOption: rule.productOption,
						variantIds: rule.variantIds,
						collectionIds: rule.collectionIds,
						productTags: rule.productTags
					}}
					onChange={handleRuleAttributesChange}
				/>
			</BlockStack>
			<BlockStack gap="200">
				<Text variant="headingMd">Advanced settings</Text>
				<Checkbox
					label="Hide price"
					checked={rule.hidePrice}
					onChange={(value) => handleRuleAttributesChange({ hidePrice: value })}
				/>
				<Checkbox
					label="Hide add to cart"
					checked={rule.hideAddToCart}
					onChange={(value) => handleRuleAttributesChange({ hideAddToCart: value })}
				/>
				<Checkbox
					label="Hide buy it now"
					checked={rule.hideBuyItNow}
					onChange={(value) => handleRuleAttributesChange({ hideBuyItNow: value })}
				/>
			</BlockStack>
		</BlockStack>
	);
}
