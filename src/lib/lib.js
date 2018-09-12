import { 
    range, 
    tryCatch, 
    empty
} from 'ramda'

import { 
    config,
    compile,
    parse 
} from 'mathjs'

// Settings for Math.js behaivor
config({ predictable: true, matrix: 'Array' })

const getFunctionPairsOfValues = (expression) => {
  const code = compile(expression)
  return range(-10,11)
           .map( n =>({ x: n*0.1 }) )
           .map( o => ({...o, y: code.eval(o) }))
}

const getValues = (expression) =>
    tryCatch(getFunctionPairsOfValues, () => empty([]) )(expression)

export default {
    getExpressionValues : getValues
}
