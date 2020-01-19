import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"

const Header = () => (
  <header className="py-8 md:py-16 absolute top-0 left-0 right-0 z-10">
    <div className="container">
      <div className="flex flex-wrap items-center mb-4">
        <Link className="font-bold block text-lg md:text-xl inline-block mb-6 md:mb-0" to="/">
          <Logo />
        </Link>

        <div className="w-full md:w-auto md:ml-auto">
          <nav aria-labelledby="mainmenulabel">
            <h2 id="mainmenulabel" className="sr-only">Main Menu</h2>
            <ul>
              <li className="inline-block ml-0 md:ml-2 mx-1 md:mx-2">
                <Link activeClassName="border-b border-cream" className="link no-underline border-b border-transparent" to="/locations" partiallyActive={true}>Locations</Link>
              </li>
              <li className="inline-block mx-1 md:mx-2">
                •
              </li>
              <li className="inline-block mx-1 md:mx-2">
                <Link activeClassName="border-b border-cream" className="link no-underline border-b border-transparent" to="/about" partiallyActive={true}>About</Link>
              </li>
              <li className="inline-block mx-1 md:mx-2">
                •
              </li>
              <li className="inline-block mx-1 md:mx-2 md:mr-0">
                <Link activeClassName="border-b border-cream" className="link no-underline border-b border-transparent" to="/contact" partiallyActive={true}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
)

export default Header
