import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Transfer = props => {

	const [sessionData, updateSessionData] = useState(props.session);
	const [formData, updateFormData] = useState({
		"account-type": "checking",
		"amount": 0,
	});
	const [transConf, setTransConf] = useState(false);
	const [redirect, setRedirect] = useState();

	const handleChange = (event) => {
		var result = event.target.value.trim();
		updateFormData({
			...formData,
			[event.target.name]: result
		});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		var currentChecking = sessionData.checkingbalance;
		var currentSavings = sessionData.savingsbalance;
		var trans = {
			id: -1,
			date: new Date().toISOString().slice(0, 10),
			user: sessionData.username,
			desc: "",
			amount: parseInt(formData.amount) * -1
		};
		if (formData['account-type'] === "savings") {
			trans.desc = "Transfer from savings";
			updateSessionData({
				...sessionData,
				savingsbalance: (currentSavings - parseInt(formData.amount)),
				checkingbalance: (currentChecking + parseInt(formData.amount))
			});
		} else {
			trans.desc = "Transfer from checking";
			updateSessionData({
				...sessionData,
				checkingbalance: (currentChecking - parseInt(formData.amount)),
				savingsbalance: (currentSavings + parseInt(formData.amount))
			});
		}
		setTransConf(props.addTransaction(trans));
	}

	useEffect(() => {
		if (props.session === null) {
			setRedirect("/");
		} else if (sessionData.checkingbalance !== props.session.checkingbalance
				|| sessionData.savingsbalance !== props.session.savingsbalance) {
			if (transConf) {
				props.updateAccount(sessionData);
				props.setSession(sessionData);
				setRedirect("/");
			}
		}
	},[props, sessionData, formData, transConf]);

	if (redirect) {
		return(
			<Redirect to="/"/>
		);
	} else {
		return (
			<div className="container">
				<h1>Transfer</h1>
				<form onSubmit={ handleSubmit }>
					<div className="mb-3">
						<label htmlFor="inputAccountType" className="form-label">Source account</label>
						<select className="form-select form-select-lg mb-3" id="inputAccountType" name="account-type" defaultValue="checking" onChange={ handleChange }>
							<option value="checking">Checking</option>
							<option value="savings">Savings</option>
						</select>
					</div>
					<label htmlFor="inputAmount" className="form-label">Amount</label>
					<div className="input-group mb-3">
						<span className="input-group-text">$</span>
						<input type="number" className="form-control" id="inputAmount" name="amount" min="1"
							max={ formData['account-type'] === "savings" ? props.session.savingsbalance : props.session.checkingbalance }
							required onChange={ handleChange }/>
						<span className="input-group-text">.00</span>
					</div>
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}


};

export default Transfer;