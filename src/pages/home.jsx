import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setSearchFilm } from '../reducers/actions';
import head from '../commponents/head-helper';

export default () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');

	const history = useHistory();
	const showsData = useSelector((state) => state.tvmaze.searchResult);

	useEffect(() => {
		if (showsData) history.push('/shows-list');
	}, [showsData]);

	const searchFilm = (e) => {
		e.preventDefault();
		if (searchText) {
			dispatch(setSearchFilm(searchText));
			setSearchText('');
		}
	};

	return (
		<form onSubmit={searchFilm} className='container'>
			{head('Search')}

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
