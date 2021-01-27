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

function App() {

  const[session, setSession] = useState();
	const[accounts, setAccounts] = useState([]);
	const[transactions, setTransactions] = useState([]);

	const addAccount = acct => {
		setAccounts([...accounts,
			acct
		])
  }
  
  const getAccount = name => {
    const check = accounts.filter(entry => entry.username === name);
    if (check.length > 0) {
      return check[0];
    } else {
      return null;
    }
  }

	const addTransaction = trans => {
		setTransactions([...transactions,
			trans
		])
	}

	return (
		<div className="App">
			<Router>

				<Navbar />

				<Switch>
					<Route path="/createaccount">
						<CreateAccount addAccount={ addAccount } addTransaction={ addTransaction } getAccount={ getAccount }/>
					</Route>
          <Route path="/home">
						<Home session={ session }/>
					</Route>
					<Route path="/">
						<Login getAccount={ getAccount } setSession={ setSession }/>
					</Route>
				</Switch>

			</Router>
		</div>
	);
}

export default App;
