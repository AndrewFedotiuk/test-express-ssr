import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
	const testFunc = () => {
		console.log('js');
	};

	const head = () => (
		<Helmet>
			<title>my title</title>
		</Helmet>
	);

	return (
		<div>
			{head()}
			hello world
			<button type='submit' onClick={testFunc}>console log</button>
		</div>
	);
};

export default Home;
