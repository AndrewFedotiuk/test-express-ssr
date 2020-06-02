import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from './app';

import store, { composeEnhancers, search, singleSearch } from './store';

import reducer from './reducers';

let finalStore = store;

if (typeof window !== 'undefined') {
	const preloadedState = window.__PRELOADED_STATE__;

	delete window.__PRELOADED_STATE__;

	finalStore = createStore(reducer, preloadedState,
		composeEnhancers(
			applyMiddleware(
				ReduxThunk.withExtraArgument({ search, singleSearch }),
			),
		));
}

window.onload = () => {
	let renderMethod;
	if (typeof window === 'undefined') {
		renderMethod = ReactDOM.hydrate;
	} else {
		renderMethod = ReactDOM.render;
	}

	Loadable.preloadReady().then(() => {
		renderMethod(
			<BrowserRouter>
				<Provider store={finalStore}>
					<App />
				</Provider>
			</BrowserRouter>,
			document.getElementById('root'),
		);
	});
};
