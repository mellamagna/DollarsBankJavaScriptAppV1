import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Login = props => {

	const [formData, updateFormData] = useState({
		"username": "",
		"password": "",
	});
	const [redirect, setRedirect] = useState();
	const [showLoginAlert, setShowLoginAlert] = useState(false);

	const handleChange = (event) => {
		var result = event.target.value.trim();
		updateFormData({
			...formData,
			[event.target.name]: result
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		var passCheck = props.getAccount(formData.username);
		if (passCheck !== null) {
			if (passCheck.password === formData.password) {
				props.setSession(passCheck);
				setRedirect("/");
			} else {
				setShowLoginAlert(true);
			}
		} else {
			setShowLoginAlert(true);
		}
	}

	const LoginAlert = () => {
		return (
			<div className="form-text form-alert">Invalid username or password.</div>
		);
	}

	if(redirect) {
		return(
			<Redirect to={ redirect } />
		);
	} else {
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={ handleSubmit }>
					<div className="mb-3">
						{ showLoginAlert ? <LoginAlert /> : null }
						<label htmlFor="inputUsername" className="form-label">Username</label>
						<input type="text" className="form-control" id="inputUsername" name="username"
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputPassword" className="form-label">Password</label>
						<input type="password" className="form-control" id="inputPassword" name="password"
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<Link to="/createaccount">Create an account</Link>
					</div>
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
};

export default Login;