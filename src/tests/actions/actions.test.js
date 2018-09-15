import { 
    errorExpression,
    saveExpression,
    saveOrErrorExpression,
    removeExpression,
    updateCurrentExpression 
} from '../../actions/actions'

import { getId, getCreationTime } from '../../lib/lib'
import C from '../../actions/constants'
import should from 'should'
import moment from 'moment'
import v4 from 'uuid'

describe('errorExpression Test Suite', () => {
    it('should create a errorExpression action', () => {
        // given

        // when
        const expression     = 'cos(x) - f(g(x))'
        const type           = C.ERROR_EXPRESSION
        const expectedAction = {
            expression: expression,
            type: type
        }
       
        // should
        errorExpression(expression).should.be.eql(expectedAction)
    })
})

describe('saveExpression Test Suite', () => {
    it('should create a saveExpression action', () => {
        // given

        // when
        const id             = getId()
        const createdAt      = getCreationTime()
        const expression     = 'cos(x) - f(g(x))'
        const type           = C.SAVE_EXPRESSION
        const savedExpression = saveExpression(expression)
       
        // should
        savedExpression.should.have.property('id').which.is.a.String()
        savedExpression.should.have.property('createdAt').which.is.a.instanceOf(moment)        
        savedExpression.should.have.property('type').which.is.a.String()
        savedExpression.should.have.property('expression').which.is.a.String()
    })
})


describe('saveOrErrorExpression Test Suite', () => {
    it('should create saveExpression or errorExpression action for well/ill formed expression', () => {
        // given

        // when
        const rightExpressions = ['cos(x)','sin(x)','log(x)','log(cos(sin(x)))'].map( exp => saveOrErrorExpression(exp) )
        const wrongExpressions = ['cosi','sinxxx','x log','gk log(cos(sin(x)))'].map( exp => saveOrErrorExpression(exp) )
       
        // should
        rightExpressions.map( expAction => expAction.should.have.property('type').which.is.equal(C.SAVE_EXPRESSION) )
        wrongExpressions.map( expAction => expAction.should.have.property('type').which.is.equal(C.ERROR_EXPRESSION) )
        
    })
})

describe('removeExpression Test Suite', () => {
    it('should generate a Remove Expression Action', () => {
        // given

        // when
        const id = v4()      
        const removedExpression = removeExpression(id)

        // should
        removedExpression.should.have.property('id').which.is.equal(id)
        removedExpression.should.have.property('type').which.is.equal(C.REMOVE_EXPRESSION)
        
    })
})


describe('updateCurrentExpression Test Suite', () => {
    it('should generate an Update Expression Action', () => {
        // given

        // when
        const partialExpression = 'cos(x + '      
        const type = C.UPDATE_CURRENT_EXPRESSION 
        const expectedAction = {
            expression: partialExpression,
            type: type
        }

        // should
        updateCurrentExpression(partialExpression).should.be.eql(expectedAction)
        
    })
})
