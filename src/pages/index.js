import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { motion } from "framer-motion"
import Footer from "../components/footer"
// import { HTMLContent } from "../components/content"
import Img from "gatsby-image"
import SplitText from "react-pose-text"

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
const charPoses = {
  exit: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

const IndexPage = ({ data: { home, locations }, location }) => {
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
            <div className="container relative z-10">
              { locations.edges[0] && (
                <div
                  className="absolute z-10 top-0 left-0 w-full home-image ml-12 -mt-12 md:ml-16 md:-mt-16 lg:ml-20 lg:-mt-20 opacity-25"
                >
                  <Link to={`locations/${locations.edges[0].node.slug}`}>
                    <Img fluid={ locations.edges[0].node.teaserImage.fluid } className="w-full" />
                  </Link>
                </div>
              )}
              { locations.edges[1] && (
                <div
                  className="absolute z-10 top-0 right-0 w-full home-image mr-6 mt-12 sm:-mt-6 sm:mr-12 md:mt-16 md:-mt-10 lg:mr-24 lg:-mt-12 opacity-25"
                >
                  <Link to={`locations/${locations.edges[1].node.slug}`}>
                    <Img fluid={ locations.edges[1].node.teaserImage.fluid } className="w-full" />
                  </Link>
                </div>
              )}
              { locations.edges[2] && (
                <div
                  className="absolute z-10 bottom-0 left-0 w-full home-image mx-auto ml-40 -mb-16 md:ml-64 md:-mb-24 -lg:ml-64 lg:-mb-32 opacity-25"
                >
                  <Link to={`locations/${locations.edges[2].node.slug}`}>
                    <Img fluid={ locations.edges[2].node.teaserImage.fluid } className="w-full xl:ml-32" />
                  </Link>
                </div>
              )}

              {/* <HTMLContent 
                content={home.introText}
                className="home-text block mb-0 pb-0 relative z-10"
              /> */}

              <div className="md:px-24">
                <span className="home-text block mb-0 pb-0 relative z-0">
                  <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>{home.introText}</SplitText>
                </span>
              </div>
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
    locations: allDatoCmsLocation(limit: 3, filter: {archived: {eq: false}}) {
      edges {
        node {
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