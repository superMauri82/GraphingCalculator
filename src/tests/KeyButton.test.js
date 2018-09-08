import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


import KeyButton from '../components/KeyButton'

describe('KeyButton', () => {
    describe('KeyButton display', () =>{
        it('should render/display always',() => { 
            //when
            const keyButton = shallow(<KeyButton symbol="Log" category="function"/>)
            //then
            expect(keyButton.html()).toBe('<button class="function">Log</button>')
        })
    })
})
