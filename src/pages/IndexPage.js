import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Battery from '../components/Battery';

import styles from 'styles/IndexPage.scss';

@connect(state => ({
  analog: state.analog
}))
export default class IndexPage extends Component {
  static propTypes = {
    analog: PropTypes.object
  }

  render() {
    const { analog } = this.props;

    return (
      <div className={styles.parent}>
        Hi from index

        {() => {
          if (analog.get('BatteryTemperature')) {
            return (
              <Battery
                temperature={analog.get('BatteryTemperature')}
                voltage={analog.get('BatteryVoltage')}
              />
            );
          }
          return <span>Waiting for first measurement ...</span>;
        }()}
      </div>
    );
  }
}
