import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { HTMLContent } from "../components/content"
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
    transition: { type: "spring", stiffness: 20 },
    y: 0,
    opacity: 1,
  },
}

const AboutPage = ({ data: { page }, location}) => {
  return (
    <>
      <SEO
        titleOverride={page.metaTags && page.metaTags.title ? page.metaTags.title : page.title}
        descriptionOverride={page.metaTags && page.metaTags.description ? page.metaTags.description : null}
        pathnameOverride={location.pathname}
        imageOverride={page.metaTags && page.metaTags.image ? page.metaTags.image.url : null}
      />

      <motion.section
        variants={container}
        initial="hidden" 
        animate="visible"
        className=""
      >
        <motion.div 
          className="mb-16 md:mb-24"
          variants={item}
          transition="easeInOut"
        >
          <div className="relative">
            <div className="image-gradient absolute bottom-0 left-0 right-0 w-full z-10">
            </div>
            <Img fluid={page.heroImage.fluid} className="w-full mb-6 lg:mb-10 pb-64 md:pb-24 lg:pb-32 xl:pb-0" />
          </div>

          <div className="container image-gradient-title relative z-20">
            <div className="mb-10 lg:mb-16 w-full max-w-md lg:max-w-2xl 2xl:max-w-4xl">
              <h1 className="mb-3 2xl:text-8xl">{page.heroHeading}</h1>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-3/4 lg:w-2/3">
                <HTMLContent 
                  content={page.introduction}
                  className="css-cols content"
                />
              </div>
              <div className="w-full md:w-1/3">

              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mb-10 md:mb-32 overflow-hidden"
          variants={item}
          transition="easeInOut"
        >
          <div className="container">
            <div className="flex flex-wrap items-end mb-8 md:mb-12">
              <div className="w-full md:w-5/12 text-right">
                <div className="w-9/12 ml-auto md:mr-12 mb-6 md:mb-0">
                  <span className="font-display text-3xl lg:text-4xl xl:text-5xl ml-auto leading-tight">{page.supportingImage1Text}</span>
                </div>
              </div>
              <div className="w-full md:w-7/12">
                <Img fluid={page.supportingImage1.fluid} className="w-full max-w-full" />
              </div>
            </div>

            <div className="flex flex-wrap md:-mx-6">
              <div className="w-full md:w-9/12 md:px-6">
                <Img fluid={page.supportingImage2.fluid} className="w-full max-w-full mb-8" />
                <HTMLContent 
                  content={page.supportingImage2Text}
                  className="css-cols mb-8 md:mb-0 text-lg lg:text-xl"
                />
              </div>
              <div className="w-full md:w-3/12 md:px-6">
                <Img fluid={page.supportingImage3.fluid} className="w-full max-w-full mb-6" />
                <HTMLContent 
                  content={page.supportingImage3Text}
                  className="text-sm md:text-sm lg:text-base mb-8 md:mb-0"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-8 md:mb-12"
          variants={item}
          transition="easeInOut"
        >
          <div className="container">
            <div className="flex flex-wrap">
              <div className="w-full md:w-auto text-left">
                <span className="vertical block font-display text-2xl md:text-3xl xl:text-4xl ml-auto leading-tight mr-0 md:mr-6 mb-3 md:mb-0">{page.footerText}</span>
              </div>
              <div className="w-full md:flex-1">
                <Img fluid={page.footerImage.fluid} className="w-full max-w-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </>
  )
}

export default AboutPage

export const query = graphql`
  query AboutQuery {
    page: datoCmsAbout {
      title
      heroImage {
        fluid(imgixParams: {h: "1080", w: "1920"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      heroHeading
      introduction
      footerText
      footerImage {
        fluid(imgixParams: {h: "1080", w: "1920"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      supportingImage1 {
        fluid(imgixParams: {h: "600", w: "900"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      supportingImage1Text
      supportingImage2 {
        fluid(imgixParams: {h: "700", w: "1100"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      supportingImage2Text
      supportingImage3 {
        fluid(imgixParams: {h: "600", w: "400"}) {
          ...GatsbyDatoCmsFluid
        }
      }
      supportingImage3Text
      metaTags {
        title
        description
        twitterCard
        image {
          url
        }
      }
      slug
    }
  }
`