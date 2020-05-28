import '@babel/polyfill';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import bodyParser from 'body-parser';
import { Helmet } from 'react-helmet';

import App from './src/app';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('*', (req, res) => {
	const content = ReactDOMServer.renderToString(
		// eslint-disable-next-line react/jsx-filename-extension
		<StaticRouter location={req.url}>
			<App />
		</StaticRouter>,
	);

	const helmet = Helmet.renderStatic();

	const html = `
		<html lang="en-EN">
			<head>
				${helmet.meta.toString()}
				${helmet.title.toString()}
			</head>
			<body>
				<div id="root">
					${content}
				</div>
			</body>
			<script type="module" src="client_bundle.js"></script>
		</html>
	`;


	res.send(html);
});

try {
	app.listen(PORT, () => {
		console.log(`App running at port ${PORT}`);
	});
} catch (e) {
	console.log(`Server cant start - ${e}`);
}
