import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mockForServerHelper } from '../reducers/actions';

export const Head = (text) => (
	<Helmet>
		<title>{text}</title>
	</Helmet>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getSearchParamsFromURL = (key = 'name') => new URLSearchParams(useLocation().search).get(key);

export const SkipServer = ({ children }) => {
	const { loading } = useSelector((state) => state.tvmaze);
	const dispatch = useDispatch();

	if (loading === null) {
		dispatch(mockForServerHelper());
	}

	return children;
};
