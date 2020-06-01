import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import store, { composeEnhancers, search, singleSearch } from './store';

import reducer from './reducers';

let finalStore = store;

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

const SingleShow = Loadable({
	loader: () => import('./pages/single'),
	loading() {
		return <div>Loading...</div>;
	},
});

if (typeof window !== 'undefined') {
	const preloadedState = window.__PRELOADED_STATE__;

	delete window.__PRELOADED_STATE__;

	finalStore = createStore(reducer, preloadedState,
		composeEnhancers(
			applyMiddleware(
				ReduxThunk.withExtraArgument({ search, singleSearch }),
			),
		));
}

const App = () => (
	<Provider store={finalStore}>
		<h1 className='container mt-3'><Link to='/'>Search</Link></h1>
		<Switch>
			<Route
				exact
				path='/'
				render={() => (
					<Home />
				)}
			/>

			<Route
				path='/list'
				render={() => (
					<ShowsList />
				)}
			/>

			<Route
				path='/single'
				render={() => (
					<SingleShow />
				)}
			/>
		</Switch>
	</Provider>

);

export default App;
