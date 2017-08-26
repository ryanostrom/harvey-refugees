import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import createClass from 'create-react-class'
import Radium, { Style } from 'radium'

let Index = createClass({

  getInitialState() {
    return { }
  },

  render() {
    return (
      <h1 style={[styles.base]}>Home</h1>
    )
  }

})

const styles = {
  base: {
    color: "blue",
  },
}

const mapStateToProps = state => {
  return state
}

module.exports = connect(mapStateToProps, actions)(Radium(Index))
