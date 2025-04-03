import PropTypes from "prop-types";

export function DragDrop({ items = [], onChange = () => {}, renderItem = () => {} }) {
	return "";
}

DragDrop.propTypes = {
	items: PropTypes.array,
	onChange: PropTypes.func,
	renderItem: PropTypes.func
};
