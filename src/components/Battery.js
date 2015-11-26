import React, { Component, PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from 'styles/Battery.scss';


export default class Battery extends Component {
    static propTypes = {
      charger: PropTypes.object
    }

  render() {
    const { charger } = this.props;
    const batIcon = charger.get('ExtPwrPresent') > 0 ? 'battery-charging-full' : 'battery-std';
    return (
      <div className={styles.parent}>
        {charger.get('FuelPercent')}%
        <FontIcon value={batIcon} />
      </div>
    );
  }
}
