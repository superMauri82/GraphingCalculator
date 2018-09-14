import { 
    curry, // Let's have fun!!!
    range, 
    tryCatch, 
    empty,
    either,
    equals,
    length,
    take,
    head,
    identity,
    prop,
    sort,
    gt,
    lt,
    F,
    T,
    is
} from 'ramda'

import mathjs from 'mathjs'

import moment from 'moment'

import v4 from 'uuid'


// Settings for Math.js behaivor
mathjs.config({ predictable: true, matrix: 'Array' })

// Helper Functions for dealing with MATH EXPRESSIONS
const isInfinity = (p) => equals(Infinity,p) || equals(-Infinity,p)

const getFunctionPairsOfValues = (expression) => {
  console.log(expression)
  const code = mathjs.compile(expression)
  return range(-10,11)
           .map( n =>({ x: n*0.1 }) )
           .map( o => ({...o, y: code.eval(o) }))
           .map( o => ({...o, y: either(code.eval,()=>null)(o) }))
           .map( o => ( isInfinity(o.y) ? {...o, y: null } : o ) )
}




const testExpression = (expression='') => { mathjs.eval(expression,{ x: 1 }); return T(); }
const isValidExpression = (expression='') => tryCatch(testExpression,F)(expression)
const producesNumber = (expression) => is(Number,mathjs.eval(expression,{x:0}))

// Helper Functions for dealing with STATE
const momentSortAscending  = (mA,mB) => mA.isBefore(mB)
const momentSortDescending = (mA,mB) => !momentSortAscending(mA,mB)
const expressionMomentAscending  = (exp1,exp2) => momentSortAscending(exp1.createdAt,exp2.createdAt) 
const expressionMomentDescending = (exp1,exp2) => momentSortDescending(exp1.createdAt,exp2.createdAt) 

const getExpressions = ( transformer, extractor, sortCriteria, nOfElements, arrayOfExpressions ) => {
    let n = nOfElements
    let l = length(arrayOfExpressions)
    if ( gt(n,l) || lt(n,0))  
        n = l
    return transformer(extractor(take(n,sort(sortCriteria,arrayOfExpressions)))) // could and should be curry-composed ...
}


const getValues = (expression) =>
    tryCatch(getFunctionPairsOfValues, () => empty([]) )(expression)

const curryGetExpressions = curry(getExpressions)
const curryPropExpression = curry(prop)('expression')

// Exported Utility Functions...
export const isSafeExpression = (exp) => isValidExpression(exp) && producesNumber(exp) 
export const getExpressionValues  = getValues
export const getNewestExpressions = curryGetExpressions(identity)(expressionMomentAscending)  // (n,[a1,a2,a3,...,an,...,am]) => [a1,...,an]
export const getOldestExpressions = curryGetExpressions(identity)(expressionMomentDescending) // (n,[a1,a2,a3,...,an,...,am]) => [am,...,a(m-n)]
export const getNewestExpression  = curryGetExpressions(curryPropExpression)(head)(expressionMomentAscending)(1)   // [a,b,c,d,e,...] => a
export const getOldestExpression  = curryGetExpressions(curryPropExpression)(head)(expressionMomentDescending)(1)   // [z,y,x,w,v,...] => z
export const getCreationTime = () => moment()
export const getId = () => v4()
export const getNullSamples = () => getValues('1')
