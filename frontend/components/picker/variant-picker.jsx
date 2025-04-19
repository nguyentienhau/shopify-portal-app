import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { TextField, Icon, BlockStack, Card, InlineStack, Text, Avatar, Button } from "@shopify/polaris";
import { SearchIcon, XIcon } from "@shopify/polaris-icons";
import { ProductIdPrefix, VariantIdPrefix } from "@/constants";

function getSelectionIds(selected) {
	const variantIdsMap = new Map();

	selected.forEach(function (item) {
		const variantIds = variantIdsMap.get(item.productId) || [];

		if (!variantIds.includes(item.variantId)) {
			variantIdsMap.set(item.productId, variantIds.concat(item.variantId));
		}
	});

	return Array.from(variantIdsMap.entries()).map(function (variantIdsEntry) {
		const [productId, variantIds] = variantIdsEntry;
		return {
			id: ProductIdPrefix + productId,
			variants: variantIds.map((id) => ({ id: VariantIdPrefix + id }))
		};
	});
}

function getSelectedData(selected) {
	return selected
		.map(function (item) {
			return item.variants.map((variant) => variant.id.replace(VariantIdPrefix, ""));
		})
		.flat();
}

export function VariantPicker({ data = [], resource = [], onChange = () => {} }) {
	const shopify = useAppBridge();
	const [selectedItems, setSelectedItems] = useState([]);
	const [searchText, setSearchText] = useState("");

	async function handleOpenModal() {
		const products = await shopify.resourcePicker({
			type: "product",
			multiple: true,
			action: "select",
			filter: { hidden: true, variants: true },
			selectionIds: getSelectionIds(selectedItems)
		});

		if (products) {
			const newValue = getSelectedData(products);
			onChange(newValue);
		}
	}

	function handleRemoveId(id) {
		const newData = data.filter((item) => item !== id);
		onChange(newData);
	}

	useEffect(
		function () {
			const resourceMap = new Map(resource.map((item) => [item.id, item]));
			const newValue = data.map((item) => resourceMap.get(item));
			setSelectedItems(newValue);
		},
		[data, resource]
	);

	const searchedItems = useMemo(
		function () {
			const text = searchText.trim().toLowerCase();
			return selectedItems.filter(function (item) {
				return item.title.toLowerCase().includes(text);
			});
		},
		[searchText, selectedItems]
	);

	return (
		<BlockStack gap="200">
			<InlineStack gap="200">
				<TextField
					placeholder="Search products"
					prefix={<Icon source={SearchIcon} />}
					value={searchText}
					onChange={setSearchText}
				/>
				<Button size="large" onClick={handleOpenModal}>
					Browse
				</Button>
			</InlineStack>
			{searchedItems.map(function (item) {
				return (
					<Card padding="300" key={item.id}>
						<InlineStack align="space-between" blockAlign="center">
							<InlineStack gap="200">
								<Avatar source={item.imageUrl} />
								<Text truncate={true}>{item.title}</Text>
							</InlineStack>
							<Button icon={XIcon} variant="monochromePlain" onClick={() => handleRemoveId(item.id)} />
						</InlineStack>
					</Card>
				);
			})}
		</BlockStack>
	);
}

VariantPicker.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string),
	resource: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func
};
