import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchFilmById } from '../reducers/actions';
import { getSearchParamsFromURL, Head } from '../commponents/helpers';

export default () => {
	const { singleSearchResult, searchResult } = useSelector((state) => state.tvmaze);
	const dispatch = useDispatch();
	const fakeImage = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

	if (!searchResult && !singleSearchResult) {
		dispatch(searchFilmById(getSearchParamsFromURL('id')));
	} else {
		const {
			image, name, genres, summary, officialSite, language,
		} = singleSearchResult;

		return (
			<div className='container'>
				{Head('Single')}

				<div className='row'>
					<div className='col col-sm-6'>
						<img src={image ? image.original : fakeImage} className='card-img-top mb-2' alt={name} />
					</div>
					<div className='col'>
						<h2>{name}</h2>
						<p>{language}</p>
						<p>{`Ganres: ${genres.join(', ')}`}</p>
						<p dangerouslySetInnerHTML={{ __html: summary }} />
						{officialSite && (
							<p>
								{'Official site: '}
								<a href={officialSite} target='_blank' rel='noreferrer'>{officialSite}</a>
							</p>
						)}
					</div>
				</div>
			</div>
		);
	}

	return null;
};
