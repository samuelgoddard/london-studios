import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Footer from "../components/footer"
import { HTMLContent } from "../components/content"
import Img from "gatsby-image"

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
            className="w-full min-h-maxed flex flex-wrap items-center "
            variants={item}
            transition="easeInOut"
          >
            <div className="container relative z-0">
              <div className="absolute top-0 left-0 w-full home-image ml-12 -mt-12 md:ml-16 md:-mt-16 lg:ml-20 lg:-mt-20">
                <Img fluid={ home.overlaidImagery[0].fluid } className="w-full opacity-25" />
              </div>
              <div className="absolute top-0 right-0 w-full home-image mr-12 -mt-6 md:mt-16 md:-mt-10 lg:mr-24 lg:-mt-12">
                <Img fluid={ home.overlaidImagery[1].fluid } className="w-full opacity-25" />
              </div>
              <div className="absolute bottom-0 left-0 w-full home-image mx-auto ml-40 -mb-16 md:ml-64 md:-mb-24 -lg:ml-64 lg:-mb-32">
                <Img fluid={ home.overlaidImagery[2].fluid } className="w-full opacity-25 xl:ml-32" />
              </div>
              <HTMLContent 
                content={home.introText}
                className="home-text block mb-0 pb-0 relative z-10"
              />
            </div>
          </motion.div>
        </motion.section>
      <Footer className="w-full h-32 md:h-24" />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    home: datoCmsHome {
      title
      introText
      overlaidImagery {
        fluid(imgixParams: {h: "600", w: "920"}) {
          ...GatsbyDatoCmsFluid
        }
      }
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