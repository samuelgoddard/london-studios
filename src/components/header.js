import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import posed, { PoseGroup } from 'react-pose';

const Overlay = posed.div({
  enter: {
    opacity: 1,
    transition: {
      default: {  duration: 350, delay: 50 }
    }
  },
  exit: {
    opacity: 0,
    transition: {
      default: { duration: 350, delay: 300 }
    }
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      overlay: false,
    };

    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay = () => {
    this.setState({
      overlay: !this.state.overlay
    });
  }

  toggleOff = () => {
    this.setState({
      overlay: false
    });
  }

  render() {
    return (
      <header className="py-8 md:py-16 absolute top-0 left-0 right-0 z-50">
        <div className="container">
          <div className="flex flex-wrap items-center mb-4">
            <Link className="font-bold block text-lg md:text-xl inline-block" to="/" aria-label="Navigate to the homepage">
              <Logo />
            </Link>

            <div className="w-auto ml-auto">
              <button className="bg-transpare border-none block md:hidden leading-none p-1" onClick={this.toggleOverlay}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22px" height="22px" className="mt-px">
                <g fill="#FFF">
                  <path d="M0,4  l0,2 21,0 0,-2z"/>
                  <path d="M0,10 l0,2 21,0 0,-2z"/>
                  <path d="M0,16 l0,2 21,0 0,-2z"/>
                </g>
              </svg>
              </button>
              <nav aria-labelledby="mainmenulabel" className="hidden md:block">
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
        
        <PoseGroup>
          {this.state.overlay && (
            <Overlay key="overlay" className="mobile-overlay">
              <div className="container h-full">
                <div className="flex flex-wrap items-center mb-4">
                  <Link onClick={this.toggleOverlay}  className="font-bold block text-lg md:text-xl inline-block" to="/" aria-label="Navigate to the homepage">
                    <Logo />
                  </Link>

                  <div className="w-auto ml-auto">
                    <button className="bg-transpare border-none block leading-none p-1" onClick={this.toggleOverlay}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="mt-1 ml-2" viewBox="0 0 18 18"><path fill="#FFF" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
                    </button>
                  </div>
                </div>
                <div className="h-full pb-24">
                  <nav aria-labelledby="mobileMenuLabel" className="block h-full flex flex-wrap items-center">
                    <h2 id="mobileMenuLabel" className="sr-only">Mobile Menu</h2>
                    <ul className="w-full">
                      <li className="w-full block mb-2">
                        <Link onClick={this.toggleOverlay} activeClassName="border-b border-cream" className="link no-underline border-b border-transparent text-3xl w-full font-display" to="/locations" partiallyActive={true}>Locations</Link>
                      </li>
                      <li className="w-full block mb-2">
                        <Link onClick={this.toggleOverlay} activeClassName="border-b border-cream" className="link no-underline border-b border-transparent text-3xl w-full font-display" to="/about" partiallyActive={true}>About</Link>
                      </li>
                      <li className="w-full block mb-2">
                        <Link onClick={this.toggleOverlay} activeClassName="border-b border-cream" className="link no-underline border-b border-transparent text-3xl w-full font-display" to="/contact" partiallyActive={true}>Contact</Link>
                      </li>
                    </ul>
                  </nav>

                  <nav aria-labelledby="socialmenulabelmobile" className="mb-8">
                    <h2 id="socialmenulabelmobile" className="sr-only">Social Mobile Menu</h2>
                    <ul className="block">
                      <li className="block">
                        <a className="link no-underline" href="http://example.com" target="_blank" rel="noopener noreferrer">Follow On Instagram</a>
                      </li>
                      <li className="block">
                        <a className="link no-underline" href="http://example.com" target="_blank" rel="noopener noreferrer">Follow On LinkedIn</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </Overlay>
          )}
        </PoseGroup>
      </header>
    )
  }
}

export default Header
