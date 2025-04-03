import PropTypes from "prop-types";
import { useState, createContext, useContext } from "react";

const AppContext = createContext();

const initialState = Object.freeze({
	appGeneral: {
		user: {},
		emails: [],
		exports: []
	},
	requestQuote: {
		rules: [],
		rule: {
			id: 0,
			userId: 0,
			name: "",
			status: false,
			priority: 0,
			customerOption: 0,
			customerIds: [],
			customerTags: [],
			productOption: 0,
			variantIds: [],
			collectionIds: [],
			productTags: [],
			hidePrice: false,
			hideAddToCart: false,
			hideBuyItNow: false
		},
		button: {
			id: 0,
			userId: 0,
			name: "",
			buttonSettings: {},
			buttonStyles: {},
			buttonCustomize: ""
		},
		form: {
			id: 0,
			userId: 0,
			name: "",
			productSettings: {},
			formFields: [],
			formSettings: {},
			formStyles: {},
			formCustomize: ""
		},
		orders: [],
		order: {},
		variants: [],
		logs: []
	},
	shopify: {
		shop: {},
		customers: [],
		customerTags: [],
		productTags: []
	}
});

export function ContextProvider({ children }) {
	const [state, setState] = useState(initialState);
	return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
}

ContextProvider.propTypes = {
	children: PropTypes.node
};

export function useSelector(selectFunction = () => {}) {
	const [state, _setState] = useContext(AppContext);
	return selectFunction(state);
}

export function useDispatch() {
	const [state, setState] = useContext(AppContext);

	return function (type, payload) {
		const newState = state.copy();
		const target = type.split(".").reduce((object, key) => object[key], [newState]);

		for (const key in payload) {
			target[key] = payload[key];
		}

		setState(newState);
	};
}
