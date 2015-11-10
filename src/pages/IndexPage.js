import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Battery from '../components/Battery';
import LidarChart from '../components/LidarChart';

import styles from 'styles/IndexPage.scss';

@connect(state => ({
  analog: state.analog,
  lds: state.lds
}))
export default class IndexPage extends Component {
  static propTypes = {
    analog: PropTypes.object,
    lds: PropTypes.object
  }

  render() {
    const { analog, lds } = this.props;

    // This is just a way of finding out if we have any data yet
    if (!analog.get('BatteryTemperature')) {
      return this.renderLoading();
    }

    return (
      <div className={styles.parent}>
        <Battery
          temperature={analog.get('BatteryTemperature')}
          voltage={analog.get('BatteryVoltage')}
          externalVoltage={analog.get('ExternalVoltage')}
        />

        <LidarChart
          ldsData={lds}
        />
      </div>
    );
  }

  renderLoading() {
    return <span>Waiting for first measurement ...</span>;
  }
}
