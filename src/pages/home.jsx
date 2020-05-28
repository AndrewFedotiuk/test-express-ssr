import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { setSearchFilm } from '../reducers/actions';

const Home = () => {
	const dispatch = useDispatch();
	const inputEl = useRef();

	const searchFilm = (e) => {
		e.preventDefault();
		dispatch(setSearchFilm(inputEl.current.value));
		inputEl.current.value = '';
	};

	const head = () => (
		<Helmet>
			<title>my title</title>
		</Helmet>
	);

	return (
		<form onSubmit={searchFilm}>
			{head()}

			<input
				type='text'
				placeholder='Put film-name'
				style={{ width: '100%', 'margin-bottom': '10px' }}
				ref={inputEl}
			/>
			<br />
			<button type='submit'>Search</button>
		</form>
	);
};

export default Home;
