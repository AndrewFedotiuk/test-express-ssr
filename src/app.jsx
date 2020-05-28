import React from 'react';
import { Switch, Route } from 'react-router';

import Home from './pages/home';

const App = () => (
	<Switch>
		<Route
			path='/'
			render={(props) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Home {...props} />
			)}
		/>
	</Switch>
);

export default App;
