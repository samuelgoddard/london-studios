import mapboxgl from 'mapbox-gl'
import React from 'react'

class MapNew extends React.Component {
  createMap() {
    const zoom = 14
    const iconSize = 0.5
    const coordinates = [this.props.longitude, this.props.latitude]

    const map = new mapboxgl.Map({
      center: coordinates,
      container: 'map',
      style: 'mapbox://styles/samuelgoddard/ck67yhp4c0ome1is7rb6anlcp',
      zoom: zoom,
    })

    map.on('load', () => {
      map.loadImage('/pin.png', (error, image) => {
        if (error) {
          throw error
        }
        map.addImage('pin', image)
        map.addLayer({
          id: 'points',
          layout: {
            'icon-image': 'pin',
            'icon-size': iconSize,
          },
          source: {
            data: {
              features: [
                {
                  geometry: {
                    coordinates: coordinates,
                    type: 'Point',
                  },
                  type: 'Feature',
                },
              ],
              type: 'FeatureCollection',
            },
            type: 'geojson',
          },
          type: 'symbol',
        })
      })
    })
  }

  componentDidMount() {
    mapboxgl.accessToken ='pk.eyJ1Ijoic2FtdWVsZ29kZGFyZCIsImEiOiJjazYzcG9zeW0wbWlpM2xvNDdhandkMmRzIn0.UqCNXPMQkuhCKZbi7cwirQ'
    this.createMap()
  }

  render() {
    return (
      <div id={'map'} style={{width: '100%', height: '100%'}} />
    )
  }
}

export default MapNew
