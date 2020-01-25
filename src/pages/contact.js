import React from "react"
// import { graphql } from "gatsby"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Footer from "../components/footer"
import Form from "../components/form"
import GeneralForm from "../components/generalForm"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
        <Tabs selectedTabClassName="text-white border-b border-cream opacity-100">
          <motion.div 
            className="mb-6 lg:mb-10"
            variants={item}
            transition="easeInOut"
          >
            <h1>Get In Touch</h1>
            <div className="overflow-hidden mb-12">
              <TabList className="flex flex-wrap list-none">
                <Tab className="mr-4 opacity-75">
                  <button className="block text-lg lg:text-xl uppercase focus:outline-none">Location Enquiry</button>
                </Tab>
                <Tab className="mr-0 opacity-75">
                  <button className="block text-lg lg:text-xl uppercase focus:outline-none">General Enquiry</button>
                </Tab>
              </TabList>
            </div>
          </motion.div>
          
          <motion.div 
            className="overflow-hidden w-full md:w-10/12"
            variants={item}
            transition="easeInOut"
          >
            <TabPanel className="tab__panel">
              <Form locationForm={true} color="#faf395"/>
            </TabPanel>
            <TabPanel className="tab__panel">
              <GeneralForm color="#faf395"/>
            </TabPanel>
          </motion.div>
        </Tabs>
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