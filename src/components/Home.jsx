import React from 'react';

const Home = props => {
	return (
		<div className="container">
			<h1>Account summary</h1>
			<div className="row balance-display">
				<div className="col-sm">
					<span className="balance">${props.session.checkingbalance}</span>
					<br/>
					<span className="balance-label">CHECKING</span>
				</div>
				<div className="col-sm">
					<span className="balance">${props.session.savingsbalance}</span>
					<br/>
					<span className="balance-label">SAVINGS</span>
				</div>
			</div>
			<h2>Customer information</h2>
			<div className="container">
				<table class="table">
					<tbody>
						<tr>
							<th scope="row">Account holder</th>
							<td>{props.session.firstname} {props.session.lastname}</td>
						</tr>
						<tr>
							<th scope="row">Address</th>
							<td>{props.session.address}</td>
						</tr>
						<tr>
							<th scope="row">Phone</th>
							<td>{props.session.phone}</td>
						</tr>
						<tr>
							<th scope="row">User ID</th>
							<td>{props.session.username}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;