import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const duration = 0.35

const container = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: duration,
    },
  },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Footer = ({ className }) => (
  <motion.footer
    variants={container}
    initial="hidden" 
    animate="visible"
    className={className ? className : `pt-12 pb-8 md:pt-20 md:pb-16 w-full`}
  >
    <motion.div 
      className="container"
      variants={item}
      transition="easeInOut"
    >
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-auto">
          <nav aria-labelledby="footermenulabel">
            <h2 id="footermenulabel" className="sr-only">Footer Menu</h2>
            <ul>
              <li className="block">
                <Link className="link no-underline" to="/contact/enquiry">Enquire About A Space</Link>
              </li>
              <li className="block">
                <Link className="link no-underline" to="/contact">Get In Touch</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-full md:w-auto md:ml-auto">
          <nav aria-labelledby="socialmenulabel">
            <h2 id="socialmenulabel" className="sr-only">Social Menu</h2>
            <ul className="md:text-right">
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
    </motion.div>
  </motion.footer>
)

export default Footer
