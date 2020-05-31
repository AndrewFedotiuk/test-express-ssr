import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

export const Head = (text) => (
	<Helmet>
		<title>{text}</title>
	</Helmet>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getSearchParamsFromURL = (key = 'name') => new URLSearchParams(useLocation().search).get(key);

export const SkipServer = ({ children }) => {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		setIsDesktop(true);
	}, []);
	return isDesktop ? children : null;
};
