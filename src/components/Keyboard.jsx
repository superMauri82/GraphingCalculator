import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Keyboard from 'react-simple-keyboard'
import { getNullSamples } from '../lib/lib'
import 'simple-keyboard/build/css/index.css'
import '../styles/simple-keyboard-reset.css'

export default class KeyboardCalculator extends Component {

  constructor(props){
      super(props)
      const { 
          onExpressionUpdate,
          onChangeWrapper,
          input
      } = this.props
      this.onExpressionUpdate = onExpressionUpdate
      this.onChangeWrapper    = onChangeWrapper
      this.input = input
  }


  componentWillReceiveProps(nextProps){
      const { input } = nextProps
      this.input = input
  }

  onKeyPress = (button) => {
    if(button === "{clear}" ){
      this.onExpressionUpdate('')
      this.keyboard.setInput('')
    }
  }

  onChange = (input) => { 
      this.onExpressionUpdate(input)
      this.onChangeWrapper(input)
  }

  render(){
    return (
      <div className={"demoPage"}>
        <div className={"screenContainer"}>
          <textarea className={"inputContainer"} value={this.input} />
        </div>
        <Keyboard
          ref={r => this.keyboard = r}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          layoutName={'default'}
          newLineOnEnter={true}
          layout={{
            'default': [
              'e log pi phi {bksp}',
              'x^3 sin cos tan sign',
              'x^2 exp ( ) /',
              'log10 7 8 9 *',
              '^ 4 5 6 -',
              'sqrt 1 2 3 +',
              '{clear} 0 . x abs',
              '{space}',
            ]          
          }}
          theme={"hg-layout-default hg-theme-default"}
          debug={false}
          display={{
            '{norm}': 'default',
            '{ext}': 'extended',
            '{clear}': 'cls',
            '{space}': 'space ',
            '{bksp}':  'bksp ',
            '{//}': ' '
          }}
        />
      </div>
    );
  }
 
}

KeyboardCalculator.propTypes = {
    data: PropTypes.arrayOf(PropTypes.array),
}

KeyboardCalculator.defaultProps = {
    data: [getNullSamples()]
}
