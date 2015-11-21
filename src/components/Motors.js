import React, { Component, PropTypes } from 'react';

export default class Motors extends Component {
  static propTypes = {
    motors: PropTypes.object
  }

  render() {
    const { motors } = this.props;
    return (
      <dl>
        <dt>Left</dt><dd>{motors.get('LeftWheel_Speed')} mm/s</dd>
        <dt>Right</dt><dd>{motors.get('RightWheel_Speed')} mm/s</dd>
        <dt>Vacuum</dt><dd>{motors.get('Vacuum_RPM')} RPM</dd>
	<dt>Brush</dt><dd>{motors.get('Brush_RPM')} RPM</dd>
      </dl>
    );
  }
}
