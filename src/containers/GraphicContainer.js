import React from 'react' 
import { connect } from 'react-redux'
import Graphic from './../components/Graphic'
import storeFactory from '../store/storeFactory'
import { getExpressionValues, getNewestExpression } from '../lib/lib'

const mapStateToProps = state => ({
    data: [getExpressionValues(getNewestExpression(state.savedExpressions))],
})

const GraphicContainer = connect(
    mapStateToProps,
    null
)(Graphic)

export default GraphicContainer
