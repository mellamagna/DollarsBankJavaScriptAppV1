import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DollarsBankLogo from './DollarsBankLogo';

const Navbar = props => {

	const NavLinks = () => {
		if (props.session !== null) {
			return (
				<Fragment>
					<li className="vl" />
					<li className="nav-item">
						<span id="navbarmessage">Welcome, {props.session.firstname} {props.session.lastname}</span>
					</li>
					<li className="vl" />
					<li className="nav-item">
						<Link className="nav-link" to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/deposit">Deposit</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/logout">Log out</Link>
					</li>
				</Fragment>
			);
		} else {
			return null;
		}
	}

	return (
		<div className="container-fluid" id="navbar">
			<nav>
				<ul className="nav">
					<li className="nav-item">
						<DollarsBankLogo />
					</li>
					<NavLinks />
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;