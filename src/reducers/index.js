import tvmaze from './tvmaze';

const reducer = (state, action) => ({
	tvmaze: tvmaze(state, action),
});

export default reducer;
