// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = composeWithDevTools({
	// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const api = 'http://api.tvmaze.com/search/shows?q=';

const store = createStore(reducer,
	composeEnhancers(
		applyMiddleware(
			ReduxThunk.withExtraArgument({ api }),
		),
	));

export default store;
