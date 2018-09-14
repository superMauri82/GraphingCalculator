import React, { Component } from 'react' 
import { connect } from 'react-redux'
import FeedbackDisplay from './../components/FeedbackDisplay'

const mapStateToProps = state => ({
    statusCode: state.feedbackStatus.statusCode,
    msg: state.feedbackStatus.statusDescription
})

const DisplayFeedbackContainer = connect(mapStateToProps)(FeedbackDisplay)

export default DisplayFeedbackContainer
