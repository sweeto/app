import React, { Component, PropTypes } from 'react';

export default class Battery extends Component {
  static propTypes = {
    temperature: PropTypes.number.isRequired,
    voltage: PropTypes.number.isRequired,
    externalVoltage: PropTypes.number.isRequired
  }

  render() {
    const { temperature, voltage, externalVoltage } = this.props;
    return (
      <dl>
        <dt>Charging</dt><dd>{() => { return externalVoltage > 1.0 ? 'Yes' : 'No'; }()}</dd>
        <dt>Temperature</dt><dd>{temperature}&deg;C</dd>
        <dt>Voltage</dt><dd>{voltage} V</dd>
      </dl>
    );
  }
}
