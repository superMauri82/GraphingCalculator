import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'simple-keyboard/build/css/index.css';

export default class KeyboardCalculator extends Component {
  state = {
    input: '',
    layoutName: "default"
  }

  componentDidMount(){
    this.keyboard.setInput("")
      .then(input => {
        this.setState({input: input});
      });
  }
  
  onChange = (input) => {
    this.setState({
      input: input
    }, () => {
      console.log("Input changed", input);
    });
  }

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /* Switch functionality */
    if(button === "{ext}" || button === "{norm}")
      this.handleShiftButton();
  }

  handleShiftButton = () => {
    let layoutName = this.state.layoutName;
    let shiftToggle = layoutName === "default" ? "extended" : "default";

    this.setState({
      layoutName: shiftToggle
    });
  }
  
  render(){
    return (
      <div className={"demoPage"}>
        <div className={"screenContainer"}>
          <textarea className={"inputContainer"} value={this.state.input} />
        </div>
        <Keyboard
          ref={r => this.keyboard = r}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          layoutName={this.state.layoutName}
          newLineOnEnter={true}
          layout={{
            'default': [
              'log 1 2 3 (',
              'exp 4 5 6 )',
              'cos 7 8 9 +',
              'acos e 0 pi -',
              '{space} {bksp} {ext}',
            ],
            'extended': [
              'ln 1 2 3 (',
              'tan 4 5 6 )',
              'acos 7 8 9 C',
              'acos e 0 pi D',
              '{space} {bksp} {norm}',
            ]          
          }}
          theme={"hg-layout-default hg-theme-default"}
          debug={false}
          display={{
            '{norm}': 'default',
            '{ext}': 'extended',
            '{bksp}': 'backspace',
            '{enter}': '< enter',
            '{space}': ' ',
            '{//}': ' '
          }}
        />
      </div>
    );
  }
 
}
