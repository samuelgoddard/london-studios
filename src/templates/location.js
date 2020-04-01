import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Form from "../components/form"
import { HTMLContent } from "../components/content"
import Carousel from "../components/carousel"
import Img from "gatsby-image"
import { motion } from "framer-motion"
import Footer from "../components/footer"
import MapNew from "../components/mapnew"


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
            <Img fluid={current.featuredImage.fluid} className="w-full mb-6 lg:mb-10 pb-64 md:pb-24 lg:pb-32 xl:pb-0" />
          </div>

          <div className="container image-gradient-title relative z-20">
            <div className="mb-10 lg:mb-16">
              <h1 className="mb-3">
              { current.studio && (
                <span>Studio</span>
               )} <span style={color}>{current.title}</span></h1>

              <div className="text-base md:text-lg lg:text-xl md:flex md:flex-wrap">
                <div className="w-full md:w-auto md:pr-5">
                  <span>Location: {current.locationArea}</span>
                </div>
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
              <div className="w-full md:w-2/3 mb-8 md:mb-0">
                <HTMLContent 
                  content={current.introductionText}
                  className="text-3xl md:text-3xl lg:text-4xl 2xl:text-4xl leading-snug lg:leading-col normal-case"
                />
              </div>
              { current.locationTag && (
                <div className="w-full hidden md:block md:w-1/3 md:text-right">
                  <span className={current.locationTag === 'central' ? `w-full block leading-tight text-2xll font-display text-white` : `w-full block leading-tight text-2xll font-display text-grey`}>Central { current.locationTag === 'central' && (<>•</>)}</span>
                  <span className={current.locationTag === 'north' ? `w-full block leading-tight text-2xll font-display text-white` : `w-full block leading-tight text-2xll font-display text-grey`}>North { current.locationTag === 'north' && (<>•</>)}</span>
                  <span className={current.locationTag === 'south' ? `w-full block leading-tight text-2xll font-display text-white` : `w-full block leading-tight text-2xll font-display text-grey`}>South { current.locationTag === 'south' && (<>•</>)}</span>
                  <span className={current.locationTag === 'east' ? `w-full block leading-tight text-2xll font-display text-white` : `w-full block leading-tight text-2xll font-display text-grey`}>East { current.locationTag === 'east' && (<>•</>)}</span>
                  <span className={current.locationTag === 'west' ? `w-full block leading-tight text-2xll font-display text-white` : `w-full block leading-tight text-2xll font-display text-grey`}>West { current.locationTag === 'west' && (<>•</>)}</span>
                </div>
              )}
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
                className="mb-16 md:mb-32 w-full"
                data-sal="fade" data-sal-delay="0" data-sal-easing="ease"
                key={index}
              >
                <h3 className={ index % 2 ? `text-right` : ``}>{title}</h3>
                <div className="overflow-hidden">
                  <div className="flex flex-wrap md:-mx-6">
                    <div className={ index % 2 ? `order-1 md:order-2 w-full md:w-1/2 lg:w-2/3 md:px-6 mb-8 md:mb-0` : `order-1 md:order-2 w-full md:w-1/2 lg:w-2/3 md:px-6 mb-8 md:mb-0`}>
                      <Carousel
                        images={images}
                      />
                    </div>
                    <div className={ index % 2 ? `order-2 md:order-1 w-full md:w-1/2 lg:w-1/3 md:px-6` : `order-1 md:order-2 w-full md:w-1/2 lg:w-1/3 md:px-6`}>
                      <HTMLContent 
                        content={description}
                        className="content content--floor mb-4 md:mb-6"
                      />
                      { floorplan && (
                        <a href={floorplan.url} target="_blank" rel="noopener noreferrer" className="text-cream underline text-lg md:text-xl">Download Floorplans</a>
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
            <div className="container" data-sal="fade" data-sal-delay="0" data-sal-easing="ease">
              <div className="overflow-hidden">
                <div className="flex flex-wrap md:-mx-6 lg:-mx-12">
                  { current.hireRates && (
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6 lg:px-12">
                      <h3 className="mb-6 md:mb-8">Hire<span className="block">Information</span></h3>
                      <HTMLContent 
                        content={current.hireRates}
                        className="content"
                      />
                    </div>
                  )}

                  { current.furtherInformation && (
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6 lg:px-12">
                      <h3 className="mb-6 md:mb-8">Further<span className="block">Details</span></h3>
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
            <div className="overflow-hidden" data-sal="fade" data-sal-delay="0" data-sal-easing="ease">
              <div className="container">
                <h3>Location</h3>
                <div className="flex flex-wrap md:-mx-6">
                  <div className="w-full md:w-2/3 lg:w-3/4 mb-4 md:mb-0 md:px-6">
                    <div className="w-full h-100 lg:h-124 bg-grey opacity-75 flex flex-wrap items-center justify-center">
                      <MapNew longitude={current.location.longitude} latitude={current.location.latitude} />
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-1/4">
                    <span className="text-sm text-grey block mb-2">Address:</span>
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
          <div className="overflow-hidden" data-sal="fade" data-sal-delay="0" data-sal-easing="ease">
            <div className="container">
              <div className="mb-5 md:mb-8">
                <h3 className="mb-5 md:mb-3">Enquire</h3>
                <p>Please get in touch to discuss your hire dates and space requirements.</p>
              </div>
              <Form color={current.color.hex} />
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
      studio
      title
      locationArea
      locationTag
      featuredImage {
        fluid(
          maxWidth: 1920
          imgixParams: {h: "1080", w: "1920", fit: "crop", crop: "center"}) {
          ...GatsbyDatoCmsFluid
        }
      }      
      floors {
        images {
          fluid(
            maxWidth: 1920
            imgixParams: {h: "600", w: "920"}) {
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
      location {
        latitude
        longitude
      }
      color {
        hex
      }
      slug
    }
  }
`