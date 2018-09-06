import React, { Component } from 'react';
import './ProgressBar.css'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      maxValue: 100,
      showInputRange: true
    }
  }

  componentDidMount() {
    this.setState({
      currentValue: this.props.currentValue,
      maxValue: this.props.maxValue
      })

  }
  percentage() {
    let currentValue = this.state.currentValue,
      maxValue   = this.state.maxValue;
    return Math.floor( ( currentValue / maxValue ) * 100 );
  }

  getStyle( percentage ) {
    if ( percentage > 79  ) { return 'ok'; }
    if ( percentage >= 70 && percentage <= 79 ) { return 'warning'; }
    if ( percentage < 70  ) { return 'danger'; }
  }

  completion() {
    return `${ this.state.currentValue } of ${ this.state.maxValue }`;
  }

  totalLeft() {
    return `${ this.state.maxValue - this.state.currentValue} left`;
  }

  setValue = (e) => {
    this.setState({currentValue: e.target.value});
  }

  render() { 
    let style   = this.getStyle( this.percentage() ),
        classes = `react-progress-bar ${ style }`;

    return (
      <div className="react-progress-bar-container">
        {this.state.showInputRange && <input
          ref="range"
          type="range"
          min="0"
          max= { this.state.maxValue }
          value = {this.state.currentValue}
          onChange={ this.setValue }
        />}
        <div className="icon">
            <i className="material-icons">{this.props.icon}</i>
        </div>
        <div className={ classes }>
          <div className="labels">
            <span className="completion">{ this.completion() }</span>
            <span className="percentage">{ this.percentage() }%</span>
            <span className="total">{ this.totalLeft() }</span>
          </div>
          <div className="bar">
            <div style={{ width: this.percentage() + "%" }} className="fill"></div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default ProgressBar;