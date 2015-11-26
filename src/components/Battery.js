import React, { Component, PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

export default class Battery extends Component {
    static propTypes = {
      charger: PropTypes.object
    }

  render() {
    const { charger } = this.props;
    const batIcon = charger.get('ExtPwrPresent') > 0 ? 'battery-charging-full' : 'battery-std';
    return (
      <div>{charger.get('FuelPercent')}%
        <FontIcon value={batIcon} />
      </div>
    );
  }
}
