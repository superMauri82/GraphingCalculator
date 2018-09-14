/* eslint_disable */
import C from '../actions/constants'


// Exported Reducer:

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


// Exported Reducer:
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

// Exported Reducer:
export const currentExpression = (state='', action) => {
    switch (action.type){
      case (C.UPDATE_CURRENT_EXPRESSION): {
        return action.expression
      }
      default:
        return state;
    }
}

// Internal Use Reducer:
const savedExpression = ( state = {}, action ) => {
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
