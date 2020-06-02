import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from '../src/app';
import generateHTML from './helper';

import 'isomorphic-fetch';

import manifest from '../build/public/react-loadable-ssr-addon.json';
import reducer from '../src/reducers';
import { composeEnhancers, search, singleSearch } from '../src/store';


const ssr = (req, res) => {
	const store = createStore(reducer,
		composeEnhancers(
			applyMiddleware(
				ReduxThunk.withExtraArgument({ search, singleSearch }),
			),
		));

	const unsubscribe = store.subscribe(() => {
		const { loading } = store.getState().tvmaze;

		if (!loading && (typeof loading === 'boolean')) {
			unsubscribe();
			const html = generateHTML(store, req, manifest);
			res.status(200).send(html);
		}
	});

	ReactDOMServer.renderToString(
		// eslint-disable-next-line react/jsx-filename-extension
		<Provider store={store}>
			<StaticRouter location={req.url}>
				<App />
			</StaticRouter>
		</Provider>,
	);
};

export default ssr;
