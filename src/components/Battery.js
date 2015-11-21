import React, { Component, PropTypes } from 'react';

export default class Battery extends Component {
    static propTypes = {
      charger: PropTypes.object
    }

  render() {
    const { charger } = this.props;
    return (
      <dl>
        <dt>Charging</dt><dd>{() => { return charger.get('ExtPwrPresent') > 0 ? 'Yes' : 'No'; }()}</dd>
        <dt>Percentage</dt><dd>{charger.get('FuelPercent')}%</dd>
      </dl>
    );
  }
}
