import types from './action-types';

const initialState = {
	searchResult: null,
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_STARTED:
			return {
				...state,
				loading: true,
			};

		case types.SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				searchResult: action.payload,
			};

		case types.SEARCH_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
