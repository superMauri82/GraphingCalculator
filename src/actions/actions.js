import C from './Constants'
import { v4 } from 'uuid'

export const updateFeedbackStatus = 
    ( statusCode=0, msg='')=>
      ({
          statusCode,
          msg,
          type: C.UPDATE_FEEDBACK_STATUS
      })

