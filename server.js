import '@babel/polyfill';

import express from 'express';
import bodyParser from 'body-parser';

import Loadable from 'react-loadable';

import fetch from 'node-fetch';
import ssr from './server/ssr';

global.fetch = fetch;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.get('*', ssr);

Loadable.preloadAll().then(() => {
	try {
		app.listen(PORT, () => {
			console.log(`App running at port ${PORT}`);
		});
	} catch (e) {
		console.log(`Server error - ${e}`);
	}
});
