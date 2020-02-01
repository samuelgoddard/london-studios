import React, { Component } from 'react'
import PropTypes from "prop-types"
import Img from "gatsby-image"
import EmblaCarouselReact from "embla-carousel-react";
import { motion } from 'framer-motion'

const duration = 0.75

const container = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.25,
      delayChildren: duration,
    },
  },
}
const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  },
}

const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot${selected ? " is-selected" : ""}`}
    onClick={onClick}
  />
);


class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: props.images,
      isLoading: true,
      current: 0,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  positionUpdate(e) {
    this.embla.scrollTo(e);
    this.setState({
      current: e,
    })
  }

  scrollPrev() {
    this.setState(prevState => {
      return {
        current: prevState.current <= 0 ? prevState.current : prevState.current - 1
      }
    })
    this.embla.scrollPrev()
  }
  scrollNext() {
    this.setState(prevState => {
      console.log(this.state.images.length)
      return {
        current: prevState.current >= (this.state.images.length - 1) ? prevState.current : prevState.current + 1
      }
    })
    this.embla.scrollNext()
  }

  render() {
    return (
      <>
        {!this.state.isLoading ? (
          <motion.section
            variants={container}
            initial="hidden" 
            animate="visible"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-wrap items-center">
                { this.state.current !== 0 && (
                  <motion.button
                    variants={item}
                    transition="easeInOut"
                    className="ml-5 p-1 font-bold text-xl text-cream appearance-none focus:outline-none z-10"
                    onClick={() => this.scrollPrev(this.state.images.length)}
                  >
                  &larr;
                  </motion.button>
                )}
                { this.state.current !== (this.state.images.length - 1) && (
                  <motion.button
                    variants={item}
                    transition="easeInOut"
                    className="mr-5 p-1 font-bold text-xl text-cream appearance-none focus:outline-none z-10 ml-auto"
                    onClick={() => this.scrollNext(this.state.images.length)}
                  >
                    &rarr;
                  </motion.button>
                )}
              </div>
              <EmblaCarouselReact
                emblaRef={c => (this.embla = c)}
                htmlTagName={`div`}
                options={{ 
                  align: 'start',
                  slidesToScroll: 1,
                  draggable: true,
                  loop: false,
                  speed: 8
                }}
                className="embla"
              >
                <div className="embla__container max-w-full">
                  {this.state.images.map((image, index) =>
                    <motion.div
                      key={index}
                      variants={item}
                      transition="easeInOut"
                      className="embla__slide"
                    >
                      <Img fluid={image.fluid} key={image.slug} alt={image.alt} className="w-full block mb-px" />
                    </motion.div>
                  )}
                </div>
                
                { this.state.images.length > 1 && (
                  <div className="embla__dots">
                    {this.state.images.map((image, index) =>
                      <DotButton
                        selected={index === this.state.current}
                        onClick={() => this.positionUpdate(index)}
                        key={index}
                      />
                    )}
                  </div>
                )}

              </EmblaCarouselReact>
            </div>
          </motion.section>
        ) : (
          <p>Loading Reviews&hellip;</p>
        )}
      </>
    )
  }
}

Carousel.propTypes = {
  images: PropTypes.array,
}

Carousel.defaultProps = {
  images: [],
}

export default Carousel