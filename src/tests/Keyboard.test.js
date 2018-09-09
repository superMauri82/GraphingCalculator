import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


import Keyboard from '../components/Keyboard'

describe('Keyboard', () => {
    describe('Keyboard display', () =>{
        it('should render/display always',() => { 
            //when
            const keyboard = shallow(<Keyboard symbol="Log" category="function"/>)
            //then
            expect(keyboard.html()).toBe('<button class="function">Log</button>')
        })
    })
})
