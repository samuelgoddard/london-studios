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
          className="mb-16 md:mb-32"
          variants={item}
          transition="easeInOut"
        >
          <div className="relative">
            <div className="image-gradient absolute bottom-0 left-0 right-0 w-full z-10">
            </div>
            <Img fluid={page.heroImage.fluid} className="w-full mb-6 lg:mb-10" />
          </div>

          <div className="container -mt-24 md:-mt-40 lg:-mt-56 xl:-mt-64 relative z-20">
            <div className="mb-10 lg:mb-16 w-full max-w-xs lg:max-w-2xl">
              <h1 className="mb-3">{page.heroHeading}</h1>
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
      supportingText
      footerText
      footerImage {
        fluid(imgixParams: {h: "1080", w: "1920"}) {
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
      slug
    }
  }
`