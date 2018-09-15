import C from './constants'
import { isSafeExpression, getCreationTime, getId } from '../lib/lib'

export const errorExpression = ( expression='' ) =>
      ({
          expression: expression,
          type: C.ERROR_EXPRESSION
      })

export const saveExpression = ( expression='' ) =>
      ({
          id: getId(),
          createdAt: getCreationTime(),
          expression: expression,
          type: C.SAVE_EXPRESSION
      })

export const saveOrErrorExpression = ( expression='' ) =>
    isSafeExpression(expression) ? saveExpression(expression) : errorExpression(expression)

export const removeExpression = ( id ) =>
      ({
          id,
          type: C.REMOVE_EXPRESSION
      })

export const updateCurrentExpression = ( partialExpression ) =>
      ({
          expression: partialExpression,
          type: C.UPDATE_CURRENT_EXPRESSION
      })
