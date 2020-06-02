import types from './action-types';

const initialState = {
	searchWord: null,
	searchResult: null,
	singleSearchResult: null,
	loading: null,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SEARCH_STARTED:
			return {
				...state,
				loading: true,
				searchWord: action.payload,
			};

		case types.MOCK_FOR_SERVER_HELPER:
			return {
				...state,
				loading: false,
			};

		case types.SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				searchResult: action.payload,
			};

		case types.SINGLE_SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				singleSearchResult: action.payload,
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
