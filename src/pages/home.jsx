import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { searchFilm } from '../reducers/actions';
import { Head } from '../commponents/helpers';

export default () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');
	const history = useHistory();

	const emitSearch = async (e) => {
		e.preventDefault();
		if (searchText) {
			await dispatch(searchFilm(searchText));

			history.push(`/list?keyword=${searchText}`);
		}
	};

	return (
		<form onSubmit={emitSearch}>
			{Head('Search')}

			<input
				type='text'
				placeholder='Put film-name'
				className='col-12 my-3'
				maxLength='100'
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onBlur={() => setSearchText(searchText.trim())}
			/>
			<br />
			<button type='submit' className='btn btn-primary'>Search</button>
		</form>
	);
};
