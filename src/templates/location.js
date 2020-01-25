import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Form from "../components/form"
import { HTMLContent } from "../components/content"
import Img from "gatsby-image"
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

const LocationPage = ({ data: { current }, location}) => {
  const color = { color: current.color.hex }
  return (
    <>
      <SEO
        titleOverride={current.metaTags && current.metaTags.title ? current.metaTags.title : current.title}
        descriptionOverride={current.metaTags && current.metaTags.description ? current.metaTags.description : null}
        pathnameOverride={location.pathname}
        imageOverride={current.metaTags && current.metaTags.image ? current.metaTags.image.url : null}
      />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className=""
      >
        <motion.div 
          variants={item}
          transition="easeInOut"
          className="mb-16 md:mb-32"
        >
          <div className="relative">
            <div className="image-gradient absolute bottom-0 left-0 right-0 w-full z-10">
            </div>
            <Img fluid={current.featuredImage.fluid} className="w-full mb-6 lg:mb-10" />
          </div>
          <div className="container -mt-12 md:-mt-20 lg:-mt-32 xl:-mt-48 relative z-20">
            <div className="mb-10 lg:mb-16">
              <h1 className="mb-3">Studio <span style={color}>{current.title}</span></h1>
              <div className="text-base md:text-lg lg:text-xl md:flex md:flex-wrap">
                <div className="w-full md:w-auto md:pr-5">
                  <span>Useable Area: {current.totalUseableArea}</span>
                </div>
                <div className="w-full md:w-auto md:pr-5">
                  <span>Total Capacity: {current.totalCapacity}</span>
                </div>
                <div className="w-full md:w-auto">
                  <span>Postcode: {current.postcode}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3">
                <HTMLContent 
                  content={current.introductionText}
                  className="text-xl md:text-2xl lg:text-3xl leading-snug"
                />
              </div>
              <div className="w-full md:w-1/3">

              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          transition="easeInOut"
          className="container"
        >
          <div className="flex flex-wrap">
            {current.floors.map(({images, title, description, floorplan}, index) => (
              <div
                className="mb-16 md:mb-32"
                key={index}
              >
                <h3 className={ index % 2 ? `text-right` : ``}>{title}</h3>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap md:-mx-6">
                    <div className={ index % 2 ? `order-1 md:order-2 w-full md:w-1/2 lg:w-2/3 md:px-6 mb-8 md:mb-0` : `order-1 md:order-2 w-full md:w-1/2 lg:w-2/3 md:px-6 mb-8 md:mb-0`}>
                      {images.map(({fluid}, index) => (
                        <Img fluid={fluid} key={index} className="w-full" />
                      ))}
                    </div>
                    <div className={ index % 2 ? `order-2 md:order-1 w-full md:w-1/2 lg:w-1/3 md:px-6` : `order-1 md:order-2 w-full md:w-1/2 lg:w-1/3 md:px-6`}>
                      <HTMLContent 
                        content={description}
                        className="content content--floor mb-4 md:mb-6"
                      />
                      { floorplan && (
                        <a href={floorplan.url} target="_blank" rel="noopener noreferrer" style={color} className="underline">&darr; Download Floorplans</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        { (current.hireRates || current.furtherInformation) && (
          <motion.div 
            variants={item}
            transition="easeInOut"
            className="mb-10 md:mb-32"
          >
            <div className="container">
              <div className="overflow-hidden">
                <div className="flex flex-wrap md:-mx-6 lg:-mx-12">
                  { current.hireRates && (
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6 lg:px-12">
                      <h3 className="mb-6 md:mb-8">Hire<span className="block">Rates</span></h3>
                      <HTMLContent 
                        content={current.hireRates}
                        className="content"
                      />
                    </div>
                  )}

                  { current.furtherInformation && (
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6 lg:px-12">
                      <h3 className="mb-6 md:mb-8">Further<span className="block">Information</span></h3>
                      <HTMLContent 
                        content={current.furtherInformation}
                        className="content"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        { current.address && (
          <motion.div 
            variants={item}
            transition="easeInOut"
            className="mb-16 md:mb-32"
          >
            <div className="overflow-hidden">
              <div className="container">
                <h3>Location</h3>
                <div className="flex flex-wrap md:-mx-6">
                  <div className="w-full md:w-2/3 lg:w-3/4 mb-4 md:mb-0 md:px-6">
                    <div className="w-full h-64 bg-grey opacity-75 flex flex-wrap items-center justify-center">
                      <span>Map Will Go Here</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-1/4">
                    <span className="text-sm text-grey">Address:</span>
                    <HTMLContent 
                      content={current.address}
                      className="content content--address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <motion.div 
          variants={item}
          transition="easeInOut"
        >
          <div className="overflow-hidden">
            <div className="container">
              <div className="mb-5 md:mb-8">
                <h3 className="mb-5 md:mb-3">Enquire</h3>
                <p>Please get in touch to discuss your hire dates and space requirements.</p>
              </div>
              <Form locationForm={true} formName="Location Enquiry" color={current.color.hex} />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </>
  )
}

export default LocationPage

export const query = graphql`
  query LocationQuery($slug: String!) {
    current: datoCmsLocation(slug: { eq: $slug }) {
      title
      featuredImage {
        fluid(imgixParams: {h: "1080", w: "1920", fit: "crop", crop: "center"}) {
          ...GatsbyDatoCmsFluid
        }
      }      
      floors {
        images {
          fluid(imgixParams: {h: "600", w: "920"}) {
            ...GatsbyDatoCmsFluid
          }
        }
        title
        description
        floorplan {
          url
        }
      }
      address
      totalCapacity
      totalUseableArea
      postcode
      introductionText
      hireRates
      furtherInformation
      metaTags {
        title
        description
        twitterCard
        image {
          url
        }
      }
      color {
        hex
      }
      slug
    }
  }
`