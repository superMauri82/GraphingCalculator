import { 
  feedbackStatus,
  savedExpressions, 
  currentExpression,
  savedExpression
} from '../../reducers/reducers'

import { 
    errorExpression,
    saveExpression,
    saveOrErrorExpression,
    removeExpression,
    updateCurrentExpression 
} from '../../actions/actions'

import should from 'should'

describe('feedbackStatus Test Suite', () => {

    it('should return passed-in state', () => {
        // when
        const state = {}
       
        // should
        feedbackStatus(state,{}).should.be.equal(state)
    })

    it('should update state right and whithout mutating it', () => {
        // when
        const state = {}
        const errorExpressionAction = saveOrErrorExpression('kdlf')
        const okExpressionAction    = saveOrErrorExpression('cos(x)')
        const expectedErrorState = {
          statusCode: 1,
          statusDescription: "Not Valid Expression",
        }
        const expectedOkState = {
          statusCode: 0,
          statusDescription: "No Error",
        }
       
        // should
        feedbackStatus(state,errorExpressionAction).should.be.eql(expectedErrorState)
        feedbackStatus(state,okExpressionAction).should.be.eql(expectedOkState)
    })

})


describe('savedExpressions Test Suite', () => {

    it('should return passed-in state', () => {
        // when
        const state = []
       
        // should
        savedExpressions(state,{}).should.be.equal(state)
    })

    it('should update state right and whithout mutating it', () => {
        // when
        const state = []
        const saveExpressionAction = saveOrErrorExpression('cos(x)')
        // should
        savedExpressions(state,saveExpressionAction).should.be.eql([
          savedExpression({},saveExpressionAction)
        ])
    })
})


describe('currentExpression Test Suite', () => {

    it('should return passed-in state', () => {
        // when
        const state = ''
       
        // should
        currentExpression(state,{}).should.be.equal(state)
    })

    it('should update state right and whithout mutating it', () => {
        // when
        const previousState = 'cos sin lo'
        const expression    = 'cos sin log'
        const updateExpressionAction   = updateCurrentExpression(expression)
        
        // should
        currentExpression(previousState,updateExpressionAction).should.be.eql(expression)
    })

})
