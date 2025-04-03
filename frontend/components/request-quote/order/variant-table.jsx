import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, Box, DataTable, TextField, Button, Icon } from "@shopify/polaris";
import { SearchIcon, DeleteIcon } from "@shopify/polaris-icons";
import { useSelector, useDispatch } from "@/utilities";
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
	return selected.map(function (item) {
		const { variants, ...product } = item;
		product.id = product.id.replace(ProductIdPrefix, "");
		const productData = Object.entries(product).reduce(function (data, entry) {
			const newKey = "product" + entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
			return { ...data, [newKey]: entry[1] };
		}, {});
		return variants.map(function (variant) {
			const id = variant.id.replace(VariantIdPrefix, "");
			return { ...variant, ...productData, id };
		});
	});
}

export function VariantTable() {
	const dispatch = useDispatch();
	const shopify = useAppBridge();
	const { order } = useSelector((state) => state.requestQuote);

	async function handleModalOpen() {
		const products = await shopify.resourcePicker({
			type: "product",
			multiple: true,
			action: "select",
			filter: { hidden: true, variants: true },
			selectionIds: getSelectionIds(order.variants)
		});

		if (products) {
			const variants = getSelectedData(products);
			dispatch("requestQuote.order", { variants });
		}
	}

	function handleRemoveVariant(id) {
		const variants = order.variants.filter((item) => item.id !== id);
		dispatch("requestQuote.order", { variants });
	}

	return (
		<Card>
			<Box paddingBlockEnd="200">
				<TextField
					placeholder="Select products"
					prefix={<Icon source={SearchIcon} />}
					onFocus={handleModalOpen}
				/>
			</Box>
			<DataTable
				verticalAlign="middle"
				columnContentTypes={["text", "text", "text", "text", "text"]}
				headings={["Product", "Quoted price", "Quantity", "Total price", "Action"]}
				rows={order.variants.map(function (item) {
					return [
						<div key="product">
							<div>{item.productTitle}</div>
							<div>Variant: {item.title}</div>
							<div>Price: {item.originalPrice}</div>
							<div>SKU: {item.sku}</div>
						</div>,
						<TextField key="price" type="number" value={item.price} onChange={() => {}} />,
						<TextField key="quantity" type="number" value={item.quantity} onChange={() => {}} />,
						<div key="total-price">{item.quantity * item.price}</div>,
						<Button
							key="action"
							icon={DeleteIcon}
							variant="monochromePlain"
							onClick={() => handleRemoveVariant(item.id)}
						/>
					];
				})}
			/>
		</Card>
	);
}
