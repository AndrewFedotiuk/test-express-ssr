import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

import { Provider } from 'react-redux';
import store from './store';
import { SkipServer } from './commponents/helpers';

const Home = Loadable({
	loader: () => import('./pages/home'),
	loading() {
		return <div>Loading...</div>;
	},
});

const ShowsList = Loadable({
	loader: () => import('./pages/list'),
	loading() {
		return <div>Loading...</div>;
	},
});

const App = () => (
	<Provider store={store}>
		<Switch>
			<Route
				exact
				path='/'
				render={(props) => (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<Home {...props} />
				)}
			/>

			<Route
				path='/list'
				render={(props) => (
					<SkipServer>
						{/* eslint-disable-next-line react/jsx-props-no-spreading */}
						<ShowsList {...props} />
					</SkipServer>
				)}
			/>
		</Switch>
	</Provider>

);

export default App;
