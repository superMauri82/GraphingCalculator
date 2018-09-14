import React from 'react' 
import { connect } from 'react-redux'
import Keyboard from './../components/Keyboard'
import { getExpressionValues, getNewestExpression } from '../lib/lib'
import { saveOrErrorExpression, updateCurrentExpression } from '../actions/actions'


const mapStateToProps = state => ({
    input: state.currentExpression
})

const mapDispatchToProps = dispatch => ({
    onChangeWrapper:    (input) => dispatch(saveOrErrorExpression(input)),
    onExpressionUpdate: (input) => dispatch(updateCurrentExpression(input))
})

const KeyboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Keyboard)

export default KeyboardContainer 
