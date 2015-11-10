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
        <dt>Charging</dt><dd>{() => { return externalVoltage > 1000 ? 'Yes' : 'No'; }()}</dd>
        <dt>Temperature</dt><dd>{Math.round(temperature / 100) / 10}&deg;C</dd>
        <dt>Voltage</dt><dd>{Math.round(voltage / 100) / 10} V</dd>
      </dl>
    );
  }
}
