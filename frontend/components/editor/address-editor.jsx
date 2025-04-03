import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Checkbox, FormLayout, TextField, Box } from "@shopify/polaris";
import { Modal } from "@/components/resource";

export function AddressEditor({
	open = false,
	title = "Edit Field",
	data = {},
	onSave = () => {},
	onClose = () => {}
}) {
	const [newData, setNewData] = useState({});
	const [errors, setErrors] = useState({});

	function handleChangeAttribute(key, value) {
		setNewData({ ...newData, [key]: value });
		setErrors({ ...errors, [key]: "" });
	}

	function handleSave() {
		const errors = {};

		if (newData.label.trim() === "") {
			errors.label = "Label is empty";
		}

		if (JSON.stringify(errors) === "{}") {
			onSave(newData);
		}

		setErrors(errors);
	}

	useEffect(
		function () {
			setNewData(data);
			setErrors({});
		},
		[data]
	);

	return (
		<Modal
			open={open}
			title={title}
			onClose={onClose}
			primaryAction={{ content: "Save", onAction: handleSave }}
			secondaryActions={[{ content: "Cancel", onAction: onClose }]}
		>
			<Box padding="300">
				<FormLayout>
					<Checkbox
						label="Required"
						checked={newData.required}
						onChange={(value) => handleChangeAttribute("required", value)}
					/>
					<FormLayout.Group condensed>
						<TextField
							label="Label"
							value={newData.label}
							onChange={(value) => handleChangeAttribute("label", value)}
							error={errors.label}
						/>
						<TextField
							label="Help text"
							value={newData.helpText}
							onChange={(value) => handleChangeAttribute("helpText", value)}
						/>
					</FormLayout.Group>
					{newData.type === "checkbox" ? null : (
						<FormLayout.Group condensed>
							<TextField
								label="Placeholder"
								value={newData.placeholder}
								onChange={(value) => handleChangeAttribute("placeholder", value)}
							/>
							<TextField
								label="Default value"
								value={newData.value}
								onChange={(value) => handleChangeAttribute("value", value)}
							/>
						</FormLayout.Group>
					)}
				</FormLayout>
			</Box>
		</Modal>
	);
}

AddressEditor.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	data: PropTypes.shape({}),
	onSave: PropTypes.func,
	onClose: PropTypes.func
};
