import { createStore, 
         combineReducers,
         applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { 
    lastFeedbackStatus,
    savedExpressions 
} from  '../reducers/reducers'

import stateData from '../state/initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action',action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
}

const saver = store => next => action => {
    let result = next(action)
    return result
}

const storeFactory = (initialState=stateData) => 
    applyMiddleware(thunk,logger,saver)(createStore)(
        combineReducers({ 
          lastFeedbackStatus,
          savedExpressions 
        }),
       stateData
    )

export default storeFactory
