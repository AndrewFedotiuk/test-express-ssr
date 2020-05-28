import types from './action-types';

const tvmaze = (state, action) => {
	if (state === undefined) {
		return {
			wantedWord: null,
			searchResult: null,
			loading: true,
			error: null,
		};
	}

	switch (action.type) {
		case types.SET_SEARCH_FILM:
			return {
				wantedWord: action.payload,
				searchResult: null,
				loading: true,
				error: null,
			};
		default:
			return state.tvmaze;
	}
};

export default tvmaze;
