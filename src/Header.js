import React from 'react';
import './header-basic.css';
import { Link } from 'react-router-dom'
const Header = () => {
  return (<header class="header-basic">

			<div class="header-limiter">
				<h1><Link to="/">Pasting<span>Place</span></Link></h1>
				<nav>
          <Link to="/">Add a Paste</Link>
					<Link to="/recent">Recent pastes</Link>
				</nav>
			</div>
		</header>);
};

export default Header;
