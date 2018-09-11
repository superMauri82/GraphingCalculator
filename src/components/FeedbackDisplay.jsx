import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Receiving statusCode 0 means NO ERROR 
const FeedbackDisplay = ({ msg, statusCode }) =>  
  <span style={{ color: (statusCode === 0) ? 'green' : 'red' }} >{msg}</span>

FeedbackDisplay.propTypes = {
    msg: PropTypes.string,
    statusCode: PropTypes.number.isRequired
}

FeedbackDisplay.defaultProps = {
    msg: "No Message",
}

export default FeedbackDisplay
