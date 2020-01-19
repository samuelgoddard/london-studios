import React from "react"
// import { graphql } from "gatsby"
import SEO from "../components/seo"
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

const ContactPage = () => {
  return (
    <>
      <SEO title="Contact" />
      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className="container pt-40 md:pt-48"
      >
        <motion.div 
          className="content w-full md:w-2/3"
          variants={item}
          transition="easeInOut"
        >
          <h1>Contact</h1>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <h2>Lorem ipsum dolor sit amet</h2>
          
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </motion.div>
      </motion.section>
    </>
  )
}

export default ContactPage

// export const query = graphql`
//   query IndexQuery {
//     home: datoCmsHome {
//       title
//     }
//   }
// `