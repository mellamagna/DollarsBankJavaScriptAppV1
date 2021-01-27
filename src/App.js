import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Custom.css';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Logout from './components/Logout';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';
import Transactions from './components/Transactions';

function App() {

	const[session, setSession] = useState(null);
	const[accounts, setAccounts] = useState([]);
  	const[transactions, setTransactions] = useState([]);
  	const[transactionId, setTransactionId] = useState(1);
	
	const addTransaction = trans => {
		if (trans.id === -1) {
			trans.id = transactionId;
		};
		console.log(trans);
		setTransactions([...transactions,
			trans
		]);
		setTransactionId(transactionId + 1);
		return true;
	}

	const addAccount = acct => {
		setAccounts([...accounts,
			acct
		]);
	}
	
	const getAccount = name => {
		const check = accounts.filter(entry => entry.username === name);
		if (check.length > 0) {
			return check[0];
		} else {
			return null;
		}
	}

	const updateAccount = acct => {
		setAccounts(accounts.map(
				x => x.username === acct.username ? acct : x
			)
		)
	}
  
	const getTransactionsFor = name => {
		const check = transactions.filter(entry => entry.user === name);
		if (check.length > 0) {
			return check;
		} else {
			return null;
		}
	}
	
	const HomePage = () => {
		if (session === null) {
			return <Login getAccount={ getAccount } setSession={ setSession }/>;
		} else {
			return <Home session={ session }/>;
		}
	}

	return (
		<div className="App">
			<Router>

				<Navbar session={ session }/>

				<main>
					<Switch>
						<Route path="/deposit">
							<Deposit session={ session } setSession={setSession} 
								updateAccount={ updateAccount } addTransaction={ addTransaction }/>
						</Route>
						<Route path="/withdraw">
							<Withdraw session={ session } setSession={setSession} 
								updateAccount={ updateAccount } addTransaction={ addTransaction }/>
						</Route>
						<Route path="/transfer">
							<Transfer session={ session } setSession={setSession} 
								updateAccount={ updateAccount } addTransaction={ addTransaction }/>
						</Route>
            <Route path="/transactions">
							<Transactions session={ session } setSession={setSession} 
								getTransactionsFor={ getTransactionsFor }/>
						</Route>
						<Route path="/logout">
							<Logout setSession={ setSession }/>
						</Route>
						<Route path="/createaccount">
							<CreateAccount session={ session } setSession={setSession} 
								addAccount={ addAccount } getAccount={ getAccount } addTransaction={ addTransaction }/>
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</main>

			</Router>
		</div>
	);
}

export default App;
