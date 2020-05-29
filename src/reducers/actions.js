import types from './action-types';

export default {};

export const searchStarted = () => ({
	type: types.SEARCH_STARTED,
});

export const searchSuccess = (data) => ({
	type: types.SEARCH_SUCCESS,
	payload: data,
});

export const searchFailure = () => ({
	type: types.SEARCH_FAILURE,
});

export const setSearchFilm = (word) => (dispatch, getState, { api }) => {
	dispatch(searchStarted());

	fetch(api.concat(word))
		.then((response) => response.json())
		.then((data) => dispatch(searchSuccess(data)))
		.catch((e) => dispatch(searchFailure(e)));
};
