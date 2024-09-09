import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <header>
    <nav className="header-container">
    <Link to="/" className="logo-and-title-container">
          <img
            alt="weather-app"
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6ekKX2z1Wf1BFrplA9sDjgZTR1OL7SsWbMkxxCd-OW8N3VamvUemoqsKP1inDxyxBso&usqp=CAU"
            />
            <h1 className="header-heading">WeatherNow</h1>
      </Link>
      <div className="nav-menu">
        <Link to="/">
          <button type="button" className="nav-menu-item">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button type="button" className="nav-menu-item">
            About
          </button>
        </Link>
      </div>
    </nav>
  </header>
)

export default Header