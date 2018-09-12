/* eslint_disable */
import moment from 'moment'
import { v4 } from 'uuid'

var initialState = {
    lastFeedbackStatus: {
       statusCode: 0,
       statusDescription: "No Error"
    },
    currentExpression: "x+ cos(x) + 10 + x^3",
    savedExpressions: [
        { 
            id: v4(),
            expression: "x + 10",
            createdAt: moment()
        },
    ]

}

export default initialState;
