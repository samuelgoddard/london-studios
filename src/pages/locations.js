import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Teaser from "../components/teaser/teaser"
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

const LocationsPage = ({ data: { locations }}) => {
  return (
    <>
      <SEO title="About" />
      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className="container pt-40 md:pt-48"
      >
        <motion.div 
          className="content mb-6 lg:mb-10"
          variants={item}
          transition="easeInOut"
        >
          <h1>Locations</h1>
          <div className="overflow-hidden">
            <div className="flex flex-wrap -mx-3">
              <div className="px-3">
                <button className="block text-lg lg:text-xl uppercase text-white border-b border-cream">Available Locations</button>
              </div>
              <div className="px-3">
                <button className="block text-lg lg:text-xl uppercase text-grey border-b border-transparent">Archive Locations</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="overflow-hidden"
          variants={item}
          transition="easeInOut"
        >
          <div className="flex flex-wrap md:-mx-4">
            {locations.edges.map(({node}, index) => {
              let metaCombined = [
                `Useable Area: ${node.totalUseableArea}`,
                `Capacity: ${node.totalCapacity}`,
                `Postcode: ${node.postcode}`
              ]
              let meta = metaCombined.join(`\u00A0\u00A0\u00A0\u00A0`);
              return (
                <div className="w-full md:w-1/2 md:px-4 mb-8 md:mb-16" key={index}>
                  <Teaser
                    slug={node.slug}
                    titlePrefix="Studio"
                    title={node.title}
                    image={node.teaserImage.fluid}
                    meta={meta}
                    active={node.active}
                  />
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}

export default LocationsPage

export const query = graphql`
  query LocationsQuery {
    locations: allDatoCmsLocation {
      edges {
        node {
          active
          title
          totalCapacity
          totalUseableArea
          postcode
          teaserImage {
            fluid(imgixParams: {h: "1200", w: "900"}) {
              ...GatsbyDatoCmsFluid
            }
          }
          slug
        }
      }
    }
  }
`