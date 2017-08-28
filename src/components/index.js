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
import MapIcon from './icon.png'
import MapIconClosed from './icon-closed.png'

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
        // <ul style={{paddingLeft: 0}}>
        //   <a href="#latest-news"><li style={styles.button}><span style={styles.buttonText}>Resources</span></li></a>
        //   <a href="#refugee-centers"><li style={styles.button}><span style={styles.buttonText}>Refugee Centers</span></li></a>
        //   <a href="#lodging"><li style={styles.button}><span style={styles.buttonText}>Lodging</span></li></a>
        //   <a href="#contact"><li style={styles.button}><span style={styles.buttonText}>Contact</span></li></a>
        // </ul>
        // <div id="refugee-centers" style={styles.refugeeCenters}>{this.renderRefugeeCenters()}</div>
        // <div id="lodging">{this.renderLodging()}</div>
    return (
      <div>
        <div>
          <span style={styles.info}>For the latest forecast from the National Hurricane Center, <a href="http://www.nhc.noaa.gov/refresh/graphics_at4+shtml/152721.shtml?gm_track"><b style={styles.link}>click here</b></a></span>
          <span style={styles.info}>For road closures across Texas, <a href="http://alerts.drivetexas.org/"><b style={styles.link}>click here</b></a> or call 800-452-9292</span>
          <span style={styles.info}>For roadside assistance, call 800-525-5555</span>
          <span style={styles.info}>For evacuation information and non-emergency help, dial 2-1-1</span>
        </div>
        <h1>Hurrican Harvey Information</h1>
        <div id="latest-news">{this.renderAffectedAreas()}</div>
        <div id="contact">{this.renderContact()}</div>
      </div>
    )
  },

  renderAffectedAreas() {
    return (
      <div>
        <h2>Resources</h2>
        <ul>
          <li><a target="_blank" href="https://www.facebook.com/safetycheck/hurricane-harvey-aug24-2017/home/">Request Help</a></li>
          <li><a target="_blank" href="http://google.org/crisismap/2017-harvey">Refugee Centers</a></li>
          <li><a target="_blank" href="https://google.org/publicalerts">Public Alerts</a></li>
          <li><a target="_blank" href="https://www.fema.gov/hurricane-harvey">FEMA Latest Updates</a></li>
          <li><a target="_blank" href="https://www.transportation.gov/hurricane-harvey">DOT Resources</a></li>
          <li><a target="_blank" href="https://weather.com/storms/hurricane/news/hurricane-harvey-texas-impacts?cm_ven=PS_GGL_Harvey_08182017_1&gclid=CjwKCAjwuITNBRBFEiwA9N9YEIthQADVsYQxKq2U9LNzH0jCQ0vH2HVprbaFSMAkXhKi2BUbvlfhBhoC_sYQAvD_BwE">Weather.com Live Updates</a></li>
          <li><a target="_blank" href="https://twitter.com/RedCross?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">Red Cross</a></li>
          <li><a target="_blank" href="http://www.texasmonthly.com/the-daily-post/ways-can-help-people-hurricane-harvey/">How to Help (Texas Monthly)</a></li>
          <li><a target="_blank" href="http://www.huffingtonpost.com/entry/how-to-help-hurricane-storm-harvey_us_59a166dde4b0821444c37515">How to Help (Huffington Post)</a></li>
          <li><a target="_blank" href="https://www.ready.gov/hurricanes">Hurricane Preparation and Response</a></li>
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
        <ul><li><a href="mailto:info@harveyrefugee.com">info@harveyrefugee.com</a></li></ul>
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
            const IconPath = location.Closed ? MapIconClosed : MapIcon

            return (
              <Marker
                key={key}
                title={location.title}
                closed={location.Closed}
                address={location.Address}
                city={location.City}
                state={location.State}
                name={location.Name}
                phone={location.Phone}
                additionalInfo={location.AdditionalInfo}
                website={location.Website}
                position={{lat: location.Lat, lng: location.Long}}
                onClick={this.onMarkerClick}
                icon={{
                  url: IconPath,
                  scaledSize: new google.maps.Size(22,40)
                }}
              />
            )
          })}
          {this.renderInfoWindow()}
        </Map>
      </div>
    )
  },

  renderInfoWindow() {

                // closed={location.Closed}

    const phone = `mailto:${this.state.selectedPlace.phone}`
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onInfoWindowClose}
      >
        <div>
          <h5>{this.state.selectedPlace.title}</h5>
          <h6>{this.state.selectedPlace.name}</h6>
          <div>{this.renderAddress()}</div>
          {this.state.selectedPlace.phone !== "" ? <div><br/><b>Phone:</b>&nbsp;<a href={phone}>{this.state.selectedPlace.phone}</a></div> : <div/>}
          {this.state.selectedPlace.website !== "" ? <div><br/><b>Website:</b>&nbsp;<a href={this.state.selectedPlace.website}>{this.state.selectedPlace.website}</a></div> : <div/>}
          {this.state.selectedPlace.additionalInfo !== "" ? <div><br/><p>{this.state.selectedPlace.additionalInfo}</p></div> : <div/>}
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
    if (!this.state.selectedPlace.address) return
    return (
      <div>
        <div>{this.state.selectedPlace.address}</div>
        <div>{this.state.selectedPlace.city}, {this.state.selectedPlace.state}</div>
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
  },
  info: {
    width: "100%",
    margin: "8px 0",
    backgroundColor: "red",
    color: "white",
    padding: "4px 16px",
    display: "block",
    borderRadius: 4,
  },
  link: {
    color: "black"
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
