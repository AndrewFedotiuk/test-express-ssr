import '@babel/polyfill';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import bodyParser from 'body-parser';
import { Helmet } from 'react-helmet';

import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';

import App from './src/app';

const manifest = require('./build/public/react-loadable-ssr-addon.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('*', (req, res) => {
	const modules = new Set();

	const content = ReactDOMServer.renderToString(
		// eslint-disable-next-line react/jsx-filename-extension
		<StaticRouter location={req.url}>
			<Loadable.Capture report={(moduleName) => modules.add(moduleName)}>
				<App />
			</Loadable.Capture>
		</StaticRouter>,
	);

	const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

	const styles = bundles.css || [];
	const scripts = bundles.js || [];

	const helmet = Helmet.renderStatic();

	const html = `
		<!doctype html>
		<html lang='en-EN'>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				${helmet.meta.toString()}
				${helmet.title.toString()}
				${styles.map((style) => `<link href='${style.file}' rel='stylesheet' />`).join('\n')}
			</head>
			<body>
				<div id='root'>${content}</div>
			</body>
			${scripts.map((script) => `<script src='${script.file}'></script>`).join('\n')}
		</html>
	`;


	res.send(html);
});

Loadable.preloadAll().then(() => {
	app.listen(PORT, () => {
		console.log(`App running at port ${PORT}`);
	});
});
