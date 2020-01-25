import React from "react"
import { Link } from "gatsby"
import SEO from "../../components/seo"
import { motion } from "framer-motion"
import Footer from "../../components/footer"
import GeneralForm from "../../components/generalForm"

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

const ContactPage = ({ location }) => {
  return (
    <>
      <SEO
        titleOverride={"Contact"}
        pathnameOverride={location.pathname}
      />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className="container pt-40 md:pt-48"
      >
        <motion.div 
          className="mb-6 lg:mb-10"
          variants={item}
          transition="easeInOut"
        >
          <h1>Get In Touch</h1>
          <div className="overflow-hidden mb-12">
            <div className="flex flex-wrap list-none">
              <div className="mr-4 text-white border-b border-cream opacity-100">
                <Link to="/contact" className="block text-lg lg:text-xl uppercase focus:outline-none">General Enquiry</Link>
              </div>
              <div className="mr-0 opacity-75">
                <Link to="/contact/enquiry" className="block text-lg lg:text-xl uppercase focus:outline-none">Location Enquiry</Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="overflow-hidden w-full md:w-10/12"
          variants={item}
          transition="easeInOut"
        >
          <GeneralForm color="#faf395"/>
        </motion.div>
      </motion.section>

      <Footer />
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