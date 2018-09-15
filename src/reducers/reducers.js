/* eslint_disable */
import C from '../actions/constants'


// handles FEEDBACK to the user:

export const feedbackStatus = (state={}, action) =>{
    switch (action.type){

      case (C.ERROR_EXPRESSION): {
        return {
          statusCode: 1,
          statusDescription: "Not Valid Expression",
        }
      }
      case (C.SAVE_EXPRESSION): {
        return {
          statusCode: 0,
          statusDescription: "No Error"
        }
      }

      default:
        return state;
    }
}


// handles SAVED EXPRESSIONS:
export const savedExpressions = (state=[], action) => {
    switch (action.type){
      case (C.SAVE_EXPRESSION): {
        return [
            ...state,
            savedExpression({},action)
        ]
      }
      default:
        return state;
    }
}

// handles CURRENT EXPRESSION:
export const currentExpression = (state='', action) => {
    switch (action.type){
      case (C.UPDATE_CURRENT_EXPRESSION): {
        return action.expression
      }
      default:
        return state;
    }
}

// handles INDIVIDUAL SAVED EXPRESSION:
export const savedExpression = ( state = {}, action ) => {
    switch (action.type){
      case (C.SAVE_EXPRESSION): { 
        return {
            id: action.id,
            createdAt:  action.createdAt,
            expression: action.expression
        }
      }
      default:
        return state;
    }
}
