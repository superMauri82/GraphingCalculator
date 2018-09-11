import React, { Component } from 'react' 
import { Provider, connect } from 'react-redux'
import FeedbackDisplay from './../components/FeedbackDisplay'
import storeFactory from '../store/storeFactory'
const store = storeFactory()

const mapStateToProps = state => ({
    msg: state.lastFeedbackStatus.statusDescription,
    statusCode:state.lastFeedbackStatus.statusCode
})

const FeedbackDisplayContainer = connect(
    mapStateToProps,
    null
)(FeedbackDisplay)

const WithProvider = () => 
    <Provider store={store} >
      <FeedbackDisplayContainer />
    </Provider>

export default WithProvider
