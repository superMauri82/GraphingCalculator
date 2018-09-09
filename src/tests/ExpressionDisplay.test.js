import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


import ExpressionDisplay from '../components/ExpressionDisplay'

describe('ExpressionDisplay', () => {
    describe('ExpressionDisplay display', () =>{
        it('should render/display always',() => { 
            //when
            const expressionDisplay = shallow(<ExpressionDisplay symbol="Log" category="function"/>)
            //then
            expect(expressionDisplay.html()).toBe('<button class="function">Log</button>')
        })
    })
})
