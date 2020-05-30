import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setSearchFilm } from '../reducers/actions';
import { head } from '../commponents/helpers';

export default () => {
	const dispatch = useDispatch();
	const showsData = useSelector(({ tvmaze }) => tvmaze.searchResult);
	const searchWord = useSelector(({ tvmaze }) => tvmaze.searchWord);

	const [searchText, setSearchText] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (showsData) history.push(`/list?keyword=${searchWord}`);
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
