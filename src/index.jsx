import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './app';

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
				<App />
			</BrowserRouter>,
			document.getElementById('root'),
		);
	});
};
