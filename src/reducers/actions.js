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
		.then((data) => normalizeData(data))
		.then((data) => dispatch(searchSuccess(data)))
		.catch((e) => dispatch(searchFailure(e)));
};

export const searchFilmById = (id) => (dispatch, getState, { singleSearch }) => {
	return fetch(singleSearch.concat(id))
		.then((response) => response.json())
		.then((data) => normalizeData([{ show: data }]))
		.then((data) => dispatch(singleSearchSuccess(data[0])))
		.catch((e) => dispatch(searchFailure(e)));
};
