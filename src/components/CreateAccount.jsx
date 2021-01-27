import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const CreateAccount = props => {

	const [formData, updateFormData] = useState({
		"firstname": "",
		"lastname": "",
		"address": "",
		"phone": "",
		"username": "",
		"password": "",
		"confirmpassword": "",
		"checkingbalance": 0,
		"savingsbalance": 0
	});
	const [redirect, setRedirect] = useState();
	const [showPasswordAlert, setShowPasswordAlert] = useState(false);
	const [showUsernameAlert, setShowUsernameAlert] = useState(false);

	const handleChange = (event) => {
		var result = event.target.value.trim();
		updateFormData({
			...formData,
			[event.target.name]: result
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (formData.password !== formData.confirmpassword || props.getAccount(formData.username)) {
			if (formData.password !== formData.confirmpassword) {
				setShowPasswordAlert(true);
			}
			if (props.getAccount(formData.username)) {
				setShowUsernameAlert(true);
			}
		} else {
			props.addAccount(formData);
			setRedirect("/");
		}
	}

	const PasswordAlert = () => {
		return (
			<div className="form-text form-alert">Passwords do not match.</div>
		);
	}

	const UsernameAlert = () => {
		return (
			<div className="form-text form-alert">Username already exists.</div>
		);
	}

	if (redirect) {
		return (
			<Redirect to="/"/>
		);
	} else {
		return (
			<div className="container">
				<h1>Create account</h1>
				<form onSubmit={ handleSubmit }>
					<div className="mb-3">
						<label htmlFor="inputFirstName" className="form-label">First name</label>
						<input type="text" className="form-control" id="inputFirstName" name="firstname" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputLastName" className="form-label">Last name</label>
						<input type="text" className="form-control" id="inputLastName" name="lastname" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputAddress" className="form-label">Address</label>
						<input type="text" className="form-control" id="inputAddress" name="address" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputPhone" className="form-label">Phone</label>
						<input type="tel" className="form-control" id="inputPhone" name="phone" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputUsername" className="form-label">Username</label>
						<input type="text" className="form-control" id="inputUsername" name="username" 
							required onChange={ handleChange }/>
						{ showUsernameAlert ? <UsernameAlert /> : null }
					</div>
					<div className="mb-3">
						<label htmlFor="inputPassword" className="form-label">Password</label>
						<input type="password" className="form-control" id="inputPassword" name="password" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputPasswordConfirm" className="form-label">Confirm password</label>
						<input type="password" className="form-control" id="inputPasswordConfirm" name="confirmpassword" 
							required onChange={ handleChange }/>
						{ showPasswordAlert ? <PasswordAlert /> : null }
					</div>
					<div className="mb-3">
						<label htmlFor="inputInitialDepositChecking" className="form-label">Initial deposit (checking)</label>
						<input type="number" className="form-control" id="inputInitialDepositChecking" min="0" max="1000000000" name="checkingbalance" 
							required onChange={ handleChange }/>
					</div>
					<div className="mb-3">
						<label htmlFor="inputInitialDepositSavings" className="form-label">Initial deposit (savings)</label>
						<input type="number" className="form-control" id="inputInitialDepositSavings"  min="0" max="1000000000" name="savingsbalance" 
							required onChange={ handleChange }/>
					</div>
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
};

export default CreateAccount;