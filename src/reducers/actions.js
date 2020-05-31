import types from './action-types';
import normalizeData from './helper';

export const searchStarted = (word) => ({
	type: types.SEARCH_STARTED,
	payload: word,
});

export const searchSuccess = (data) => ({
	type: types.SEARCH_SUCCESS,
	payload: data,
});

export const singleSearchSuccess = (data) => ({
	type: types.SINGLE_SEARCH_SUCCESS,
	payload: data,
});

export const searchFailure = (error) => ({
	type: types.SEARCH_FAILURE,
	payload: error,
});

export const searchFilm = (word) => (dispatch, getState, { search }) => {
	dispatch(searchStarted(word));

	return fetch(search.concat(word))
		.then((response) => response.json())
		.then((data) => data.map(({ show }) => normalizeData(show)))
		.then((data) => dispatch(searchSuccess(data)))
		.catch((e) => dispatch(searchFailure(e)));
};

export const searchFilmById = (id) => (
	dispatch, getState, { singleSearch },
) => fetch(singleSearch.concat(id))
	.then((response) => response.json())
	.then((show) => normalizeData(show))
	.then((show) => dispatch(singleSearchSuccess(show)))
	.catch((e) => dispatch(searchFailure(e)));
