import React, { Component, PropTypes } from 'react';

export default class Joystick extends Component {
  static propTypes = {
    onDrive: PropTypes.func.isRequired
  };

  render() {
    const { onDrive } = this.props;

    return (
      <div>
        <button onClick={() => onDrive('f')}>Forward</button>
        <button onClick={() => onDrive('r')}>Right</button>
        <button onClick={() => onDrive('b')}>Backward</button>
        <button onClick={() => onDrive('l')}>Left</button>
      </div>
    );
  }
}
