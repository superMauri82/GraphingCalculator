import React from 'react'
import expect from 'expect'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


import Graphic from '../components/Graphic'

describe('Graphic', () => {
    describe('Graphic display', () =>{
        it('should render/display always',() => { 
            //when
            const graphic = shallow(<Graphic symbol="Log" category="function"/>)
            //then
            expect(graphic.html()).toBe('<button class="function">Log</button>')
        })
    })
})
