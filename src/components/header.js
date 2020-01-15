import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => (
  <header className="py-8 md:py-16">
    
    <div className="container">
      <div className="flex flex-wrap items-center mb-4">
        <Link className="font-bold block text-lg md:text-xl inline-block" to="/">
          {siteTitle}
        </Link>

        <div className="ml-auto">
          <nav aria-labelledby="mainmenulabel">
            <h2 id="mainmenulabel" className="sr-only">Main Menu</h2>
            <ul>
              <li className="inline-block">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
