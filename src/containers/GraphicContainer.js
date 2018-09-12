import React from 'react' 
import { Provider, connect } from 'react-redux'
import Graphic from './../components/Graphic'
import storeFactory from '../store/storeFactory'
import lib from '../lib/lib'
const store = storeFactory()

const mapStateToProps = state => ({
    data: [lib.getExpressionValues(state.currentExpression)],
})

const GraphicContainer = connect(
    mapStateToProps,
    null
)(Graphic)

const WithProvider = () => 
    <Provider store={store} >
      <GraphicContainer />
    </Provider>

export default WithProvider
