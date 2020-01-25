import React from "react"
import { Link } from "gatsby"
import SEO from "../../components/seo"
import { motion } from "framer-motion"
import Footer from "../../components/footer"
import Form from "../../components/form"

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

const ContactEnquiryPage = ({ location }) => {
  return (
    <>
      <SEO
        titleOverride={"Enquiry"}
        pathnameOverride={location.pathname}
      />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
      >
        <motion.div 
          className="w-full min-h-maxed flex flex-wrap items-center"
          variants={item}
          transition="easeInOut"
        >
          <div className="container w-full">
            <div className="w-full">
              <h1>Get In Touch</h1>
              <div className="overflow-hidden mb-12">
                <div className="flex flex-wrap list-none">
                  <div className="mr-4 opacity-75 mb-2 md:mb-0">
                    <Link to="/contact" className="block text-lg lg:text-xl uppercase focus:outline-none">General Enquiry</Link>
                  </div>
                  <div className="mr-0 text-white border-b border-cream opacity-100">
                    <Link to="/contact/enquiry" className="block text-lg lg:text-xl uppercase focus:outline-none">Location Enquiry</Link>
                  </div>
                </div>
              </div>
            </div>
            <Form locationForm={true} color="#faf395"/>
          </div>
        </motion.div>
      </motion.section>

      <Footer className="w-full h-32 md:h-24" />
    </>
  )
}

export default ContactEnquiryPage