import React from 'react';
import { Helmet } from 'react-helmet';

export default (text) => (
	<Helmet>
		<title>{text}</title>
	</Helmet>
);
