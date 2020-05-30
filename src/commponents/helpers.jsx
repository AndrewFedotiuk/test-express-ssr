import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const Head = (text) => (
	<Helmet>
		<title>{text}</title>
	</Helmet>
);

export const getSearchParamsFromURL = (key = 'name') => new URLSearchParams(useLocation().search).get(key);

export const SkipServer = ({ children }) => {
	const [isDesktop, setState] = useState(false);

	useEffect(() => {
		setState(true);
	}, []);
	return isDesktop ? children : null;
};
