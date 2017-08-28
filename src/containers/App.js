/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  render() {
    const { children } = this.props
    return (
      <div style={bckStyle}>
        <div style={overlayStyle}>&nbsp;</div>
        <div style={containerStyle}>
          <img alt="" style={imgStyle} src="./images/logo.png"/>
          {children}
        </div>
      </div>
    )
  }
}

let bckStyle = {
  backgroundImage: 'url("/images/bck.jpg")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  minHeight: '100%'
}

let overlayStyle = {
  content: '',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 0,
  background: 'linear-gradient(to right,#141e30,#243b55)',
  opacity: .8
}

let containerStyle = {
  zIndex: 1,
  position: 'relative'
}

let imgStyle = {
  display: 'block',
  margin: '0 auto',
  paddingTop: '20px'
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(mapStateToProps, {
  
})(App)
