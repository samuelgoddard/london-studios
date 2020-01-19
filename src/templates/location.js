import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { HTMLContent } from "../components/content"
import Img from "gatsby-image"
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

const LocationPage = ({ data: { location }}) => {
  return (
    <>
      <SEO title={location.title} />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className=""
      >
        <motion.div 
          variants={item}
          transition="easeInOut"
        >
          <div className="relative">
            <div className="image-gradient absolute bottom-0 left-0 right-0 w-full z-10">
            </div>
            <Img fluid={location.featuredImage.fluid} className="w-full mb-6 lg:mb-10" />
          </div>
          <div className="container -mt-12 md:-mt-20 lg:-mt-32 xl:-mt-48 relative z-20">
            <div className="mb-10 lg:mb-16">
              <h1 className="mb-3">Studio <span className="text-cream">{location.title}</span></h1>
              <div className="text-base md:text-lg lg:text-xl md:flex md:flex-wrap">
                <div className="w-full md:w-auto md:pr-5">
                  <span>Useable Area: {location.totalUseableArea}</span>
                </div>
                <div className="w-full md:w-auto md:pr-5">
                  <span>Total Capacity: {location.totalCapacity}</span>
                </div>
                <div className="w-full md:w-auto">
                  <span>Postcode: {location.postcode}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3">
                <HTMLContent 
                  content={location.introductionText}
                  className="text-xl md:text-2xl lg:text-3xl leading-snug"
                />
              </div>
              <div className="w-full md:w-1/3">

              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}

export default LocationPage

export const query = graphql`
  query LocationQuery($slug: String!) {
    location: datoCmsLocation(slug: { eq: $slug }) {
      title
      featuredImage {
        fluid(imgixParams: {h: "1080", w: "1920"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      totalCapacity
      totalUseableArea
      postcode
      introductionText
      slug
    }
  }
`