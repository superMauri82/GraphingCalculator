import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import should from 'should'
import Keyboard from '../../components/Keyboard'

configure({ adapter: new Adapter() })

  

describe('Keyboard Test Suite', () => {

    let _press,
        _update,
        wrapper,
        props


    beforeAll(() => {
         _press  = jest.fn()
         _update = jest.fn()
         wrapper = mount(<Keyboard input={''} onExpressionUpdate={_update} onChangeWrapper={_press} />)
         props = wrapper.find('div.simple-keyboard').props()
    })

    it('prop className should be simple-keyboard', () => {
        props.className.should.eql('simple-keyboard')
    })
})
