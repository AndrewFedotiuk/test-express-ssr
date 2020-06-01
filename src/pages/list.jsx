import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Head, getSearchParamsFromURL } from '../commponents/helpers';
import { searchFilm, singleSearchSuccess } from '../reducers/actions';

export default () => {
	const dispatch = useDispatch();
	const showsData = useSelector((state) => state.tvmaze.searchResult);
	const fakeImage = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

	if (!showsData) {
		dispatch(searchFilm(getSearchParamsFromURL('keyword')));
	}

	return (
		<div className='container'>
			{Head('List')}
			<p>Result:</p>
			<ul className='row row-cols-1 row-cols-md-3 col mb-4'>
				{
					Array.isArray(showsData) && showsData.length ? showsData.map(({
						id, name, image, genres, summary, officialSite, language,
					}) => (
						<li key={id} className='card'>
							<Link
								className='card-body'
								to={`/single?id=${id}`}
								onClick={() => dispatch(singleSearchSuccess({
									name, image, genres, summary, officialSite, language, id,
								}))}
							>
								<img src={image ? image.medium : fakeImage} className='card-img-top mb-2' alt={name} />
								<h5 className='card-title'>{name}</h5>
								<p className='card-text'>{genres.join(', ')}</p>
							</Link>
						</li>
					)) : 'Your search - did not match any shows.'
				}
			</ul>
		</div>
	);
};
