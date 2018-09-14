import React from 'react'
import expect from 'expect'
import {
  isSafeExpression, 
  getExpressionValues, 
  getNewestExpressions, 
  getOldestExpressions, 
  getNewestExpression, 
  getOldestExpression, 
  getCreationTime, 
  getId, 
  getNullSamples
} from '../lib/lib'

describe('getId Test Suite', () => {
    describe('getId', () =>{
        it('should generate a compliant RFC4211',() => { 
              // given
              var regex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  
              // when
              var uuid = getId()
  
              // expect
              expect(uuid).toMatch(regex)
  
        })
    })
})
