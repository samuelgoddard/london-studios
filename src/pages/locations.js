import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Teaser from "../components/teaser/teaser"
import RegionSwitcher from "../components/regionSwitcher"
import { motion } from "framer-motion"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Footer from "../components/footer"
import SplitText from "react-pose-text"

const duration = 0.35

const container = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
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
    delay: ({ charIndex }) => charIndex * 80
  }
};

const LocationsPage = ({ data: { locations, archivedLocations, locationRegions }, location}) => {
  return (
    <>
      <SEO
        titleOverride={"Locations"}
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

            <div className="sm:flex sm:flex-wrap items-end mb-2 md:mb-10">
              <h1 className="mb-4 md:mb-0 pb-0"><SplitText initialPose="exit" pose="enter" charPoses={charPoses}>Locations</SplitText></h1>
            
              <span className="inline-block w-auto sm:ml-auto mb-2 md:mb-0">
                    <RegionSwitcher locations={locationRegions.edges} />
                </span>
            </div>
            
            <div className="overflow-hidden">
              <TabList className="flex flex-wrap list-none">
                <Tab className="mr-2 md:mr-4 opacity-75 pb-0 mb-2 md:mb-0 pt-px">
                  <button className="block text-sm md:text-lg lg:text-xl uppercase focus:outline-none pt-px pb-0">Available Locations</button>
                </Tab>
                { archivedLocations.edges.length > 0 && (
                  <Tab className="mr-0 opacity-75 pb-0 block pt-px">
                    <button className="block text-sm md:text-lg lg:text-xl uppercase focus:outline-none pt-px pb-0">Archive Locations</button>
                  </Tab>
                )}
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
                    `<span class="block md:inline">Useable Area: ${node.totalUseableArea}\u00A0\u00A0\u00A0\u00A0</span>`,
                    `<span class="block md:inline">Capacity: ${node.totalCapacity}\u00A0\u00A0\u00A0\u00A0</span><span class="hidden md:inline"><br/></span>`,
                    `<span class="block md:inline">Location: ${node.locationArea}\u00A0\u00A0\u00A0\u00A0</span>`,
                    `<span class="block md:inline">Postcode: ${node.postcode}</span>`
                  ]
                  let meta = metaCombined.join(``);
                  return (
                    <div className="w-full md:w-1/2 md:px-4 mb-8 md:mb-16" key={index}>
                      <Teaser
                        slug={node.slug}
                        titlePrefix={node.studio ? "Studio" : ""}
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
            { archivedLocations.edges.length > 0 && (
              <TabPanel className="tab__panel">
                <div className="flex flex-wrap md:-mx-4">
                  {archivedLocations.edges.map(({node}, index) => {
                    let metaCombined = [
                      `Location: ${node.locationArea}`,
                      `Useable Area: ${node.totalUseableArea}`,
                      `Capacity: ${node.totalCapacity}`,
                      `Postcode: ${node.postcode}`
                    ]
                    let meta = metaCombined.join(`\u00A0\u00A0\u00A0\u00A0`);
                    return (
                      <div className="w-full md:w-1/2 md:px-4 mb-8 md:mb-16" key={index}>
                        <Teaser
                          slug={node.slug}
                          titlePrefix={node.studio ? "Studio" : ""}
                          title={node.title}
                          image={node.teaserImage.fluid}
                          meta={meta}
                          disabled={true}
                          archived={true}
                          active={false}
                          color={node.color.hex}
                        />
                      </div>
                    )
                  })}
                </div>
              </TabPanel>
            )}
          </motion.div>
        </Tabs>
      </motion.section>

      <Footer />
    </>
  )
}

export default LocationsPage

export const query = graphql`
  query LocationsQuery {
    locationRegions: allDatoCmsLocationRegion {
      edges {
        node {
          name
          slug
        }
      }
    }
    locations: allDatoCmsLocation(
      filter: { archived: {eq: false} }
    ) {
      edges {
        node {
          studio
          active
          locationArea
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
          studio
          id
          locationArea
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