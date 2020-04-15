import React from "react"
import { Link } from "gatsby"
import SEO from "../../components/seo"
import { motion } from "framer-motion"
import Footer from "../../components/footer"
import Form from "../../components/form"
import SplitText from "react-pose-text"

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
    transition: { type: "spring", stiffness: 20 },
    y: 0,
    opacity: 1,
  },
}
const charPoses = {
  exit: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 65
  }
};

const ContactEnquiryPage =({ data: { locations }, location }) => {
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
              <h1><SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Get In Touch</SplitText></h1>
              <div className="overflow-hidden mb-12">
                <div className="flex flex-wrap list-none">
                  <div className="text-white border-b border-cream opacity-100 mb-2 md:mb-0 block pt-px mr-2 md:mr-4">
                    <Link to="/contact" className="block text-sm md:text-lg lg:text-xl uppercase focus:outline-none pb-0 leading-none">Location Enquiry</Link>
                  </div>
                  <div className="mr-0 md:mr-0 opacity-75 pb-0 pt-px">
                    <Link to="/contact/enquiry" className="block text-sm md:text-lg lg:text-xl uppercase focus:outline-none pb-0 leading-none">Landlord Enquiry</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Form 
                locations={locations.edges}
                locationForm={true}
                color="#faf395"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer className="w-full h-32 md:h-24" />
    </>
  )
}

export default ContactEnquiryPage

export const query = graphql`
  query ContactQuery {
    locations: allDatoCmsLocation(filter: {archived: {eq: false}}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`