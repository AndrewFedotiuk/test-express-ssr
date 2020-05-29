import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { setSearchFilm } from '../reducers/actions';

export default () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');

	const searchFilm = (e) => {
		e.preventDefault();
		if (searchText) {
			dispatch(setSearchFilm(searchText));
			setSearchText('');
		}
	};

	const head = () => (
		<Helmet>
			<title>Search</title>
		</Helmet>
	);

	return (
		<form onSubmit={searchFilm} className='container'>
			{head()}

			<input
				type='text'
				placeholder='Put film-name'
				className='col-12 my-3'
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<br />
			<button type='submit' className='btn btn-primary'>Search</button>
		</form>
	);
};
