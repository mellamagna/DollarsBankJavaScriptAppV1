import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = props => {

	useEffect(() => {
		props.setSession(null);
	});

	return (
		<Redirect to="/"/>
	);
};

export default Logout;