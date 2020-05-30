import React, { useEffect } from 'react';
import head from '../commponents/head-helper';
import { useSelector } from 'react-redux';

export default () => {
	const showsData = useSelector((state) => state.tvmaze.searchResult);
	// useEffect(() => {
	// 	if (showsData) history.push('/shows-list');
	// }, []);

	console.log(showsData);

	return(
		<div className='container'>
			{head('List')}
			<div className='row'>
				list
			</div>
		</div>
	)
};
