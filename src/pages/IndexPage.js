import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Battery from '../components/Battery';
import LidarChart from '../components/LidarChart';
import Joystick from '../components/Joystick';

// This one is not yet a real action!!!
import { mqttPost } from '../actions/ConnectionAction';

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

  onDrive(direction) {
    console.log('DRIVE');

    const driveArgs = (dir) => {
      switch (dir) {
      case 'f':
        return { LWheelDist: 300, RWheelDist: 300, Speed: 100, Accel: 100, RPM: 0 };
      case 'r':
        return { LWheelDist: 300, RWheelDist: -300, Speed: 100, Accel: 100, RPM: 0 };
      case 'b':
        return { LWheelDist: -300, RWheelDist: -300, Speed: 100, Accel: 100, RPM: 0 };
      case 'l':
        return { LWheelDist: -300, RWheelDist: 300, Speed: 100, Accel: 100, RPM: 0 };
      default:
        return {};
      }
    };

    const cmd = { cmd: 'Drive', args: driveArgs(direction)};

    mqttPost('neato/commands', JSON.stringify(cmd));
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

        <Joystick onDrive={this.onDrive.bind(this)} />

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
