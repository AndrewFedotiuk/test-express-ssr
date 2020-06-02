import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from '../src/app';

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

	const modules = new Set();

	const unsubscribe = store.subscribe(() => {
		const { loading } = store.getState().tvmaze;

		if (!loading && (typeof loading === 'boolean')) {
			unsubscribe();

			const content = ReactDOMServer.renderToString(
				// eslint-disable-next-line react/jsx-filename-extension
				<Provider store={store}>
					<StaticRouter location={req.url}>
						<Loadable.Capture report={(moduleName) => modules.add(moduleName)}>
							<App />
						</Loadable.Capture>
					</StaticRouter>
				</Provider>,
			);

			const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

			const styles = bundles.css || [];
			const scripts = bundles.js || [];

			const preloadedState = store.getState();
			const helmet = Helmet.renderStatic();

			const html = `
		<!doctype html>
		<html lang='en-EN'>
			<head>
				<meta charset='UTF-8'>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'>
				<meta http-equiv='X-UA-Compatible' content='ie=edge'>
				${helmet.meta.toString()}
				${helmet.title.toString()}
				${styles.map((style) => `<link href='${style.file}' rel='stylesheet' />`).join('\n')}
				<link href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
			</head>
			<body>
				<div id='root'>${content}</div>
			</body>
			<script>
				window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
			</script>
			${scripts.map((script) => `<script src='${script.file}'></script>`).join('\n')}
		</html>
	`;
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
