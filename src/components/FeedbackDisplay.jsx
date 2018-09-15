import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Receiving statusCode 0 means NO ERROR 

class FeedbackDisplay extends Component {
    constructor(props){
        super(props)
        const { 
            msg,
            statusCode
        } = props

        this.statusCode = statusCode
        this.msg = msg
    }

    componentWillReceiveProps(nextProps){
        const { 
            msg,
            statusCode
        } = nextProps

        this.statusCode = statusCode
        this.msg = msg
    }

    render(){
      return <span style={{ color: (this.statusCode === 0) ? 'green' : 'red' }} >{this.msg}</span>
    }
   
}

FeedbackDisplay.propTypes = {
    msg: PropTypes.string,
    statusCode: PropTypes.number
}

FeedbackDisplay.defaultProps = {
    msg: "Enter Expression",
    statusCode: 0
}

export default FeedbackDisplay
