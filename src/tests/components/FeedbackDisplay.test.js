import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import should from 'should'
import FeedbackDisplay from '../../components/FeedbackDisplay'

configure({ adapter: new Adapter() })

describe('<FeedbackDisplay /> Component Test Suite', () => {
    it('renders with defaultProps', () => {
        // when
        const feedbackDisplay = shallow(<FeedbackDisplay />)

        // should
        feedbackDisplay.find('span').length.should.be.exactly(1)

    })


    it('renders green msg when NO ERROR', () => {
        // when
        const feedbackDisplay = shallow(<FeedbackDisplay statusCode={0} />)

        // should
        feedbackDisplay.find('span').prop('style').should.have.property('color').exactly('green')

    })

    it('renders red msg when statusCode != 0', () => {
        // when
        const feedbackDisplay = shallow(<FeedbackDisplay statusCode={Math.floor(1 +  Math.random()*50)} />)

        // should
        feedbackDisplay.find('span').prop('style').should.have.property('color').exactly('red')

    })
})
