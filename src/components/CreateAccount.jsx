import React, { useEffect, useState } from 'react';
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
	const [transConf1, setTransConf1] = useState(false);
	const [transConf2, setTransConf2] = useState(false);
	const [runOnce, setRunOnce] = useState(true);
	const [showPasswordAlert, setShowPasswordAlert] = useState(false);
	const [showUsernameAlert, setShowUsernameAlert] = useState(false);

	const handleChange = (event) => {
		var result = event.target.value.trim();
		updateFormData({
			...formData,
			[event.target.name]: (event.target.name === "checkingbalance" || event.target.name === "savingsbalance" ? parseInt(result) : result)
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
			var trans1 = {
				id: -1,
				date: new Date().toISOString().slice(0, 10),
				user: formData.username,
				desc: "Initial deposit to checking",
				amount: formData.checkingbalance
			};
			if (formData.checkingbalance > 0) {
				setTransConf1(props.addTransaction(trans1));
			} else {
				setTransConf1(true);
			}
			props.addAccount(formData);
			props.setSession(formData);
		}
	}

	useEffect(() => {
		if (props.session !== null && transConf1 && runOnce) {
			setRunOnce(false);
			var trans2 = {
				id: -1,
				date: new Date().toISOString().slice(0, 10),
				user: formData.username,
				desc: "Initial deposit to savings",
				amount: formData.savingsbalance
			};
			if (formData.savingsbalance > 0) {
				setTransConf2(props.addTransaction(trans2));
			} else {
				setTransConf2(true);
			}
		}
	},[props, formData, transConf1, runOnce]);

	useEffect(() => {
		if (props.session !== null && transConf1 && transConf2) {
			setRedirect("/");
		}
	},[props, transConf1, transConf2]);

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
			<Redirect to={ redirect }/>
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
					<label htmlFor="inputInitialDepositChecking" className="form-label">Initial deposit (checking)</label>
					<div className="input-group mb-3">
						<span className="input-group-text">$</span>
						<input type="number" className="form-control" id="inputInitialDepositChecking" min="0" max="1000000000" name="checkingbalance" 
							required onChange={ handleChange }/>
						<span className="input-group-text">.00</span>
					</div>
					<label htmlFor="inputInitialDepositSavings" className="form-label">Initial deposit (savings)</label>
					<div className="input-group mb-3">
						<span className="input-group-text">$</span>
						<input type="number" className="form-control" id="inputInitialDepositSavings"  min="0" max="1000000000" name="savingsbalance" 
							required onChange={ handleChange }/>
						<span className="input-group-text">.00</span>
					</div>
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
};

export default CreateAccount;