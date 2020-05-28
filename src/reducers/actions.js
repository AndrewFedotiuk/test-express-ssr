import types from './action-types';

export default {};

export const setSearchFilm = (newWord) => ({
	type: types.SET_SEARCH_FILM,
	payload: newWord,
});
