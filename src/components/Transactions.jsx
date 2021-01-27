import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Transactions = props => {

	const [redirect, setRedirect] = useState();
	const [transList, setTransList] = useState([]);

	useEffect(() => {
		if (props.session === null) {
			setRedirect("/");
		} else {
			setTransList(props.getTransactionsFor(props.session.username));
		}
	},[props]);

	if (redirect) {
		return(
			<Redirect to={ redirect }/>
		);
	} else {
		return (
			<div className="container">
				<h1>Transaction summary</h1>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Date</th>
							<th scope="col">Description</th>
							<th scope="col">Amount</th>
						</tr>
					</thead>
					<tbody>
						{transList.map(item => {
							return(
								<tr key={item.id}>
									<th scope="row">{item.id}</th>
									<td>{item.date}</td>
									<td>{item.desc}</td>
									<td className={ item.amount >= 0 ? "posAmount" : "negAmount" }>$&nbsp;&nbsp;{item.amount}.00</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
};

export default Transactions;