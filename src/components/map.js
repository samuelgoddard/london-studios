import React, { Component } from 'react'
import PropTypes from "prop-types"
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken:
        'pk.eyJ1Ijoic2FtdWVsZ29kZGFyZCIsImEiOiJjazYzcG9zeW0wbWlpM2xvNDdhandkMmRzIn0.UqCNXPMQkuhCKZbi7cwirQ'
    });
    const zoom = [16];
    return (
      <>
        {!this.state.isLoading ? (
          <Map
          style="mapbox://styles/mapbox/dark-v10"
          zoom={zoom}
          center={[this.props.longitude, this.props.latitude]}
          containerStyle={{
            height: "100%",
            width: "100%"
          }}>
            <Layer
              type="symbol"
              id="marker"
              size="large"
              layout={{ "icon-image": "attraction-15" }}>
              <Feature coordinates={[this.props.longitude, this.props.latitude]}/>
            </Layer>
          </Map>
        ) : (
          <p>Loading Map&hellip;</p>
        )}
      </>
    )
  }
}

Map.propTypes = {
  longitude: PropTypes.array,
  latitude: PropTypes.array
}

Map.defaultProps = {
  longitude: ``,
  latitude: ``,
}

export default Map