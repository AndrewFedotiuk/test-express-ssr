import React from 'react';
import { Switch, Route } from 'react-router';

import { Provider } from 'react-redux';
import store from './store';


import Home from './pages/home';

const App = () => (
	<Provider store={store}>
		<Switch>
			<Route
				path='/'
				render={(props) => (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<Home {...props} />
				)}
			/>
		</Switch>
	</Provider>

);

export default App;
