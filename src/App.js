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

function App() {

  const[session, setSession] = useState(null);
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

  const updateAccount = acct => {
    setAccounts(accounts.map(
        x => x.username === acct.username ? acct : x
      )
    )
  }

	const addTransaction = trans => {
		setTransactions([...transactions,
			trans
		])
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
              <Deposit session={ session } setSession={setSession} updateAccount={ updateAccount }/>
            </Route>
            <Route path="/withdraw">
              <Withdraw session={ session } setSession={setSession} updateAccount={ updateAccount }/>
            </Route>
            <Route path="/transfer">
              <Transfer session={ session } setSession={setSession} updateAccount={ updateAccount }/>
            </Route>
            <Route path="/logout">
              <Logout setSession={ setSession }/>
            </Route>
            <Route path="/createaccount">
              <CreateAccount addAccount={ addAccount } addTransaction={ addTransaction } getAccount={ getAccount }/>
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
