import React from "react"
import PropTypes from "prop-types"
import {  navigate } from "gatsby"

class RegionSwitcher extends React.Component {
  onChange = e => {
    e.preventDefault();
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index]
    navigate(optionElement.getAttribute('data-id'))
  };

  render() {
    return (
      <div className="select text-sm md:text-lg">
        <select onChange={this.onChange}>
          <option data-id={`/locations/`} ref={`/locations/`} value={`/locations/`}>Choose City</option>
          <option data-id={`/locations/`} ref={`/locations/`} value={`/locations/`}>All Cities</option>
          {this.props.locations.map(({node}, index) => {
            return (
              <option data-id={`/locations/${node.slug}`} ref={`/locations/${node.slug}`} value={`/locations/${node.slug}`} key={index}>{ node.name }</option>
            )
          })}
        </select>
      </div>
    );
  }
}

RegionSwitcher.defaultProps = {
  locations: [],
}

RegionSwitcher.propTypes = {
  locations: PropTypes.array,
}

export default RegionSwitcher
