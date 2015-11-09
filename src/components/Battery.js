import React, { Component, PropTypes } from 'react';

export default class Battery extends Component {
  static propTypes = {
    temperature: PropTypes.number.isRequired,
    voltage: PropTypes.number.isRequired
  }

  render() {
    const { temperature, voltage } = this.props;
    return (
      <dl>
        <dt>Temperature</dt><dd>{temperature}&deg;C</dd>
        <dt>Voltage</dt><dd>{voltage} V</dd>
      </dl>
    );
  }
}
