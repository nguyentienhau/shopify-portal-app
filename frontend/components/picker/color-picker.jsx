import PropTypes from "prop-types";
import { useState } from "react";
import {
	InlineStack,
	TextField,
	Popover,
	Card,
	ColorPicker as ShopifyColorPicker,
	hexToRgb,
	rgbToHsb,
	hsbToHex
} from "@shopify/polaris";

export function ColorPicker({ color = "#000000", onChange = () => {} }) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	return (
		<InlineStack gap="200" blockAlign="center">
			<TextField prefix="#" value={color.replace("#", "")} onChange={(value) => onChange("#" + value)} />
			<Popover
				active={popoverOpen}
				onClose={() => setPopoverOpen(false)}
				activator={
					<button
						style={{
							backgroundColor: color,
							height: "100%",
							aspectRatio: 1,
							border: "1px solid #8a8a8a",
							borderRadius: "8px"
						}}
						onClick={() => setPopoverOpen(!popoverOpen)}
					/>
				}
			>
				<Card>
					<ShopifyColorPicker
						color={rgbToHsb(hexToRgb(color))}
						onChange={(value) => onChange(hsbToHex(value))}
					/>
				</Card>
			</Popover>
		</InlineStack>
	);
}

ColorPicker.propTypes = {
	color: PropTypes.string,
	onChange: PropTypes.func
};
