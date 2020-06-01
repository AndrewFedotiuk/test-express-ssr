// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';

export const composeEnhancers = composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const search = 'http://api.tvmaze.com/search/shows?q=';
export const singleSearch = 'http://api.tvmaze.com/shows/';

const store = createStore(reducer,
	composeEnhancers(
		applyMiddleware(
			ReduxThunk.withExtraArgument({ search, singleSearch }),
		),
	));

export default store;
