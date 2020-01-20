import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Teaser from "../components/teaser/teaser"
import { motion } from "framer-motion"
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

const LocationsPage = ({ data: { locations, archivedLocations }}) => {
  return (
    <>
      <SEO title="About" />
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
            <h1>Locations</h1>
            <div className="overflow-hidden">
              <TabList className="flex flex-wrap list-none">
                <Tab className="mr-4 opacity-75">
                  <button className="block text-lg lg:text-xl uppercase focus:outline-none">Available Locations</button>
                </Tab>
                <Tab className="mr-0 opacity-75">
                  <button className="block text-lg lg:text-xl uppercase focus:outline-none">Archive Locations</button>
                </Tab>
              </TabList>
            </div>
            
          </motion.div>

          <motion.div 
            className="overflow-hidden"
            variants={item}
            transition="easeInOut"
          >
            <TabPanel className="tab__panel">
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
                        color={node.color.hex}
                      />
                    </div>
                  )
                })}
              </div>
            </TabPanel>
            <TabPanel className="tab__panel">
              <div className="flex flex-wrap md:-mx-4">
                {archivedLocations.edges.map(({node}, index) => {
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
                        disabled={true}
                        active={false}
                        color={node.color.hex}
                      />
                    </div>
                  )
                })}
              </div>
            </TabPanel>
          </motion.div>
        </Tabs>
      </motion.section>
    </>
  )
}

export default LocationsPage

export const query = graphql`
  query LocationsQuery {
    locations: allDatoCmsLocation(filter: {archived: {eq: false}}) {
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
          color {
            hex
          }
          slug
        }
      }
    }
    archivedLocations: allDatoCmsLocation(filter: {archived: {eq: true}}) {
      edges {
        node {
          id
          title
          totalCapacity
          totalUseableArea
          postcode
          teaserImage {
            fluid(imgixParams: {h: "1200", w: "900"}) {
              ...GatsbyDatoCmsFluid
            }
          }
          color {
            hex
          }
          slug
        }
      }
    }
  }
`