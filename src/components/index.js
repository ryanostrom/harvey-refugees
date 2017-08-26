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
  GoogleApiWrapper
} from 'google-maps-react'

const initialCenter = {
  lat: 28.0268742,
  lng: -97.1158472
} // Rockport, Texas

let Index = createClass({

  componentWillMount() {
    this.locationUnavailable = (!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled)
  },

  getInitialState() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  },

  render() {
    return (
      <div>
        <div>Test</div>
        {this.renderMapResults()}
        {this.renderGoogleMap()}
      </div>
    )
  },

  renderMapResults() {
    return
  },

  renderGoogleMap() {
    return (
      <Map
        google={this.props.google}
        zoom={7}
        name={"Current Location"}
        initialCenter={initialCenter}
        onClick={this.onMapClick}
        clickableIcons={false}
      >
        <Marker
          title={`Current location`}
          name={`Current location`}
          onMarkerClick={this.onMarkerClick}
        />
        {this.props.location.available.map((location, key) => {
          return (
            <Marker
              key={key}
              title={`${location.area} area`}
              name={location.name}
              position={{lat: location.latitude, lng: location.longitude}}
              onMarkerClick={this.onMarkerClick}
            />
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
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
  base: {
    color: "blue",
  },
}

const GoogleWrapper = GoogleApiWrapper({
  apiKey: "AIzaSyBqyHeRW914QY13R-9FLWOW_SMW4YFcbIo",
  version: '3'
})(Index)

const GeolocatedWrapper = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GoogleWrapper)

const RadiumWrapper = Radium(GeolocatedWrapper)

const ReduxWrapper = connect((state) => state, actions)(RadiumWrapper)

module.exports = ReduxWrapper
