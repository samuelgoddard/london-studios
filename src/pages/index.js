import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Footer from "../components/footer"

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

const IndexPage = ({ data: { home }, location }) => {
  return (
    <>
      <SEO
        titleOverride={home.metaTags && home.metaTags.title ? home.metaTags.title : home.title}
        descriptionOverride={home.metaTags && home.metaTags.description ? home.metaTags.description : null}
        pathnameOverride={location.pathname}
        imageOverride={home.metaTags && home.metaTags.image ? home.metaTags.image.url : null}
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
            <h1 className="home-text block mb-0 pb-0"><span>London Studios</span> deliver the <span>newest venues</span> for temporary <span>events</span>, activations and <span>spaces for</span> photographic hire.</h1>
          </div>
        </motion.div>
        
        <Footer className="w-full h-32 md:h-24" />
      </motion.section>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    home: datoCmsHome {
      title
      metaTags {
        title
        description
        twitterCard
        image {
          url
        }
      }
    }
  }
`