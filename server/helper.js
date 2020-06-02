import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import { Helmet } from 'react-helmet';
import App from '../src/app';

export default (store, req, manifest) => {
	const modules = new Set();

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

	return `
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
};
