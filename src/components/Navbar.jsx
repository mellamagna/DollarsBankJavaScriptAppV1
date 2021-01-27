import React from 'react';
import DollarsBankLogo from './DollarsBankLogo';

const Navbar = () => {
	return (
		<div className="container-fluid" id="navbar">
			<nav>
				<ul className="nav">
					<li className="nav-item">
						<DollarsBankLogo />
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;