import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import FeedbackDisplay from '../components/FeedbackDisplay'

describe('FeedbackDisplay', () => {
    describe('FeedbackDisplay display', () =>{
        it('should render/display always',() => { 
            //when
            const FeedbackDisplay = shallow(<FeedbackDisplay symbol="Log" category="function"/>)
            //then
            expect(FeedbackDisplay.html()).toBe('<button class="function">Log</button>')
        })
    })
})
