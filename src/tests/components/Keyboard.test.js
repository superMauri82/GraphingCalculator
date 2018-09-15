import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Keyboard from '../../components/Keyboard'

configure({ adapter: new Adapter() })


describe('Keyboard Test Suite', () => {
    describe('Keyboard', () =>{
        it('should render/display always',() => { 
            const keyboard = shallow(<Keyboard input='cos(x)' />) 

            expect(keyboard.html()).toBeTruthy()
        })
    })
})
