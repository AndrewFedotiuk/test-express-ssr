import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const head = (text) => (
	<Helmet>
		<title>{text}</title>
	</Helmet>
);

export const getSearchParamsFromURL = (key = 'name') => new URLSearchParams(useLocation().search).get(key);
