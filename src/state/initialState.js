/* eslint_disable */
import moment from 'moment'
import { v4 } from 'uuid'

var initialState = {
    lastFeedbackStatus: {
       statusCode: 0,
       statusDescription: "No Error"
    },
    savedExpressions: [
        { 
            id: v4(),
            expression: "A + 10",
            createdAt: moment()
        },
    ]

}

export default initialState;
