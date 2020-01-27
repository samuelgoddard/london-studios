import React from "react"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Footer from "../components/footer"
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
    delay: ({ charIndex }) => charIndex * 50
  }
};

const NotFoundPage = ({ location }) => {
  return (
    <>
      <SEO
        titleOverride="Page Not Found"
        pathnameOverride={location.pathname}
      />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className=""
      >
        <motion.div 
          className="w-full min-h-maxed flex flex-wrap items-center"
          variants={item}
          transition="easeInOut"
        >
          <div className="container">
            <span className="home-text block mb-0 pb-0">
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Sorry, this page does not exist.</SplitText></span>
          </div>
        </motion.div>
        
        <Footer className="w-full h-32 md:h-24" />
      </motion.section>
    </>
  )
}

export default NotFoundPage