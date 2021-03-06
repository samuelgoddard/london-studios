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

const IndexPage = ({ data: { home, locations, homeImage }, location }) => {
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
          {/* <motion.div 
            className="absolute top-0 left-0 right-0 bottom-0 h-full w-full z-0"
            variants={item}
            transition="easeInOut"
          >
            <Img fluid={ homeImage.childImageSharp.fluid } className="h-full object-cover opacity-100" />    
          </motion.div> */}
          <motion.div 
            className="w-full min-h-maxed flex flex-wrap items-center"
            variants={item}
            transition="easeInOut"
          >
            <div className="container relative z-10">
              { locations.edges[0] && (
                <div
                  className="absolute z-10 top-0 left-0 w-full home-image ml-12 -mt-12 md:ml-16 md:-mt-24 lg:ml-20 lg:-mt-32 opacity-35"
                >
                  <Link to={`locations/${locations.edges[0].node.slug}`}>
                    <Img fluid={ locations.edges[0].node.teaserImage.fluid } className="w-full" />
                  </Link>
                </div>
              )}
              { locations.edges[1] && (
                <div
                  className="absolute z-10 top-0 right-0 w-full home-image mr-6 -mt-12 sm:-mt-6 sm:mr-12 md:mt-16 md:-mt-10 lg:mr-24 lg:-mt-12 opacity-35"
                >
                  <Link to={`locations/${locations.edges[1].node.slug}`}>
                    <Img fluid={ locations.edges[1].node.teaserImage.fluid } className="w-full" />
                  </Link>
                </div>
              )}
              { locations.edges[2] && (
                <div
                  className="absolute z-10 bottom-0 left-0 w-full home-image mx-auto ml-24 -mb-16 md:ml-64 md:-mb-24 lg:ml-64 lg:-mb-32 opacity-35"
                >
                  <Link to={`locations/${locations.edges[2].node.slug}`}>
                    <Img fluid={ locations.edges[2].node.teaserImage.fluid } className="w-full ml-12 lg:ml-32 xl:ml-48 2xl:ml-64" />
                  </Link>
                </div>
              )}

              { locations.edges[3] && (
                <div
                  className="absolute z-10 bottom-0 left-0 w-full home-image home-image--small mx-auto -mb-12 ml-12 md:ml-16 lg:ml-32 md:-mb-16 lg:-mb-24 opacity-35"
                >
                  <Link to={`locations/${locations.edges[3].node.slug}`}>
                    <Img fluid={ locations.edges[3].node.teaserImage.fluid } className="w-full" />
                  </Link>
                </div>
              )}

              { locations.edges[4] && (
                <div
                  className="absolute z-10 bottom-0 right-0 w-full home-image home-image--tiny mx-auto -mb-12 mr-12 md:mr-16 lg:mr-48 md:-mb-16 lg:-mb-24 opacity-35"
                >
                  <Link to={`locations/${locations.edges[4].node.slug}`}>
                    <Img fluid={ locations.edges[4].node.teaserImage.fluid } className="w-full" />
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
      <Footer className="w-full h-32 md:h-24 relative z-10" />
    </>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    homeImage: file(relativePath: { eq: "home.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
          fluid(imgixParams: {h: "1200", w: "900"}) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
    locations: allDatoCmsLocation(limit: 5, filter: {archived: {eq: false}}) {
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