import types from './action-types';

export const searchStarted = (word) => ({
	type: types.SEARCH_STARTED,
	payload: word,
});

export const searchSuccess = (data) => ({
	type: types.SEARCH_SUCCESS,
	payload: data,
});

export const searchFailure = (error) => ({
	type: types.SEARCH_FAILURE,
	payload: error,
});

export const setSearchFilm = (word) => (dispatch, getState, { api }) => {
	dispatch(searchStarted(word));

	fetch(api.concat(word))
		.then((response) => response.json())
		.then((data) => dispatch(searchSuccess(data)))
		.catch((e) => dispatch(searchFailure(e)));
};
