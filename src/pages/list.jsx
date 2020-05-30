import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Head, getSearchParamsFromURL } from '../commponents/helpers';
import { setSearchFilm } from '../reducers/actions';

export default () => {
	const dispatch = useDispatch();
	const showsData = useSelector((state) => state.tvmaze.searchResult);
	const fakeImage = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

	if (!showsData) {
		dispatch(setSearchFilm(getSearchParamsFromURL('keyword')));
	}

	return (
		<div className='container'>
			{Head('List')}
			<p>Result:</p>
			<ul className='row row-cols-1 row-cols-md-3 col mb-4'>
				{
					Array.isArray(showsData) && showsData.length ? showsData.map(({
						id, name, image, genres,
					}) => (
						<li key={id} className='card'>
							<div className='card-body'>
								<img src={image ? image.medium : fakeImage} className='card-img-top mb-2' alt={name} />
								<h5 className='card-title'>{name}</h5>
								<p className='card-text'>{genres.join(', ')}</p>
							</div>
						</li>
					)) : 'Your search - did not match any shows.'
				}
			</ul>
		</div>
	);
};
