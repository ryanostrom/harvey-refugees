import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import createClass from 'create-react-class'
import Radium, { Style } from 'radium'
import { geolocated } from 'react-geolocated'
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
} from 'google-maps-react'

let Index = createClass({

  getInitialState() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locationCoordinates: {
        lat: 28.0268742,
        lng: -97.1158472
      },
    }
  },

  render() {
    return (
      <div>
        <h1>Hurrican Harvey Refugees</h1>
        <ul style={{paddingLeft: 0}}>
          <a href="#latest-news"><li style={styles.button}><span style={styles.buttonText}>Latest News</span></li></a>
          <a href="#refugee-centers"><li style={styles.button}><span style={styles.buttonText}>Refugee Centers</span></li></a>
          <a href="#lodging"><li style={styles.button}><span style={styles.buttonText}>Lodging</span></li></a>
          <a href="#contact"><li style={styles.button}><span style={styles.buttonText}>Contact</span></li></a>
        </ul>
        <div id="latest-news">{this.renderAffectedAreas()}</div>
        <div id="refugee-centers" style={styles.refugeeCenters}>{this.renderRefugeeCenters()}</div>
        <div id="lodging">{this.renderLodging()}</div>
        <div id="contact">{this.renderContact()}</div>
      </div>
    )
  },

  renderAffectedAreas() {
    return (
      <div>
        <h2>Latest News</h2>
        <ul>
          <li><a target="_blank" href="http://google.org/crisismap/2017-harvey">Google Affected Area Map</a></li>
          <li><a target="_blank" href="https://weather.com/storms/hurricane/news/hurricane-harvey-texas-impacts?cm_ven=PS_GGL_Harvey_08182017_1&gclid=CjwKCAjwuITNBRBFEiwA9N9YEIthQADVsYQxKq2U9LNzH0jCQ0vH2HVprbaFSMAkXhKi2BUbvlfhBhoC_sYQAvD_BwE">Weather.com Live Updates</a></li>
          <li><a target="_blank" href="https://www.ready.gov/hurricanes">Hurricane Preparation and Response</a></li>
          <li><a target="_blank" href="https://twitter.com/RedCross?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">Red Cross</a></li>
        </ul>
      </div>
    )
  },

  renderLodging() {
    return (
      <div>
        <h2>Lodging and Reservations</h2>
        <ul>
          {this.props.location.reservations.map((section, key) => {
            return (
              <div key={key}>
                <h4>{section.city}</h4>
                <ul>
                  {section.sites.map((site, i) => {
                    return (
                      <li key={i}>
                        <a href={site.url} target="_blank">{site.name}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </ul>
      </div>
    )
  },

  renderContact() {
    return (
      <div>
        <h2>Contact</h2>
        <p>Have more information that could make help refugees in the wake of Hurricane Harvey? Contact us at <a href="mailto:info@harveyrefugee.com" target="_blank">info@harveyrefugee.com</a></p>
      </div>
    )
  },

  renderRefugeeCenters() {
    return (
      <div>
        <h2>Refugee Centers</h2>
        <Map
          google={window.google}
          zoom={7}
          name={"Current Location"}
          initialCenter={this.state.locationCoordinates}
          onClick={this.onMapClick}
          onReady={this.onMapReady}
          clickableIcons={true}
          style={styles.map}
          centerAroundCurrentLocation={true}
        >
          {this.props.location.available.map((location, key) => {
            return (
              <Marker
                key={key}
                area={`${location.area} area`}
                street={location.address.street}
                city={location.address.city}
                state={location.address.state}
                zip={location.address.zip}
                name={location.name}
                position={{lat: location.latitude, lng: location.longitude}}
                onClick={this.onMarkerClick}
              />
            )
          })}
          {this.renderInfoWindow()}
        </Map>
      </div>
    )
  },

  renderInfoWindow() {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onInfoWindowClose}
      >
        <div>
          <h5>{this.state.selectedPlace.name}</h5>
          <div>{this.renderAddress()}</div>
        </div>
      </InfoWindow>
    )
  },

  renderAddress() {
    const formattedAddress = this.formatAddress()
    if (this.props.coords && this.props.coords && this.state.selectedPlace && this.state.selectedPlace.position) {
      const link = `https://www.google.com/maps/dir/'${this.props.coords.latitude},${this.props.coords.longitude}'/'${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}'`
      return (
        <a href={link} target="_blank">{formattedAddress}</a>
      )
    }

    return formattedAddress
  },

  formatAddress() {
    if (!this.state.selectedPlace.street) return
    return (
      <div>
        <div>{this.state.selectedPlace.street}</div>
        <div>{this.state.selectedPlace.city}, {this.state.selectedPlace.state} {this.state.selectedPlace.zip}</div>
      </div>
    )
  },

  onMapReady(mapProps, map) {
    this.setState({map})
  },

  onMapClick(mapProps, map, clickEvent) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  },

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  },

  onInfoWindowClose(v) {
    this.setState({
      showingInfoWindow: false
    })
  }

})

const styles = {
  map: {
    height: "100%",
    maxHeight: "500px",
    position: "relative",
  },
  refugeeCenters: {
    marginBottom: "556px"
  },
  button: {
    backgroundColor: "#0275d8",
    color: "white",
    padding: "3px 0",
    textAlign: "center",
    width: "300px",
    margin: "6px auto",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "300"
  }
}

// apiKey: "AIzaSyBqyHeRW914QY13R-9FLWOW_SMW4YFcbIo",
// const GoogleWrapper = GoogleApiWrapper({
//   apiKey: "AIzaSyD3mU8PA1i7VASUh791MazEp7TODRNZ9sA",
//   version: '3',
//   libraries: ["places"]
// })(Index)

const GeolocatedWrapper = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
  libraries: ["places"]
})(Index)

const RadiumWrapper = Radium(GeolocatedWrapper)

const ReduxWrapper = connect((state) => state, actions)(RadiumWrapper)

module.exports = ReduxWrapper
