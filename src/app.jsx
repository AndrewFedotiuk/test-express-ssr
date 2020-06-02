import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import { SkipServer } from './commponents/helpers';

const Loader = () => (
	<div className='spinner-border text-primary mx-auto' role='status'>
		<span className='sr-only'>Loading...</span>
	</div>
);

const Home = Loadable({
	loader: () => import('./pages/home'),
	loading: () => <Loader />,
});

const ShowsList = Loadable({
	loader: () => import('./pages/list'),
	loading: () => <Loader />,
});

const SingleShow = Loadable({
	loader: () => import('./pages/single'),
	loading: () => <Loader />,
});

const App = () => (
	<div className='container'>
		<h1 className='mt-3'><Link to='/'>Search</Link></h1>
		<Switch>
			<Route
				exact
				path='/'
				render={() => (
					<SkipServer>
						<Home />
					</SkipServer>
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
	</div>

);

export default App;
