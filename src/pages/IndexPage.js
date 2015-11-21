import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Joystick from '../components/Joystick';

// This one is not yet a real action!!!
import { mqttPost } from '../actions/ConnectionAction';

import styles from 'styles/IndexPage.scss';

@connect(state => ({
  charger: state.charger
}))
export default class IndexPage extends Component {
  static propTypes = {
    charger: PropTypes.object,
    lds: PropTypes.object,
    motors: PropTypes.object
  }

  onDrive(direction) {
    console.log('DRIVE');

    const driveArgs = (dir) => {
      switch (dir) {
      case 'f':
        return {cmd: 'Drive', args: { LWheelDist: 300, RWheelDist: 300, Speed: 100, Accel: 100, RPM: 0 }};
      case 'r':
        return {cmd: 'Turn', args: {deg: -90}};
      case 'b':
        return {cmd: 'Drive', args: { LWheelDist: -300, RWheelDist: -300, Speed: 100, Accel: 100, RPM: 0 }};
      case 'l':
        return {cmd: 'Turn', args: {deg: 90 }};
      case 'clean':
        return {cmd: 'Clean'};
      case 'park':
        return {cmd: 'BackToDock'};

      default:
        return {};
      }
    };


    mqttPost('neato/commands', JSON.stringify(driveArgs(direction)));
  }

  render() {
    const { charger } = this.props;

    // This is just a way of finding out if we have any data yet
    if (!charger.get('VBattV')) {
      return this.renderLoading();
    }

    return (
      <div className={styles.parent}>
        <Joystick onDrive={this.onDrive.bind(this)} />
      </div>
    );
  }

  renderLoading() {
    return <span>Waiting for first measurement ...</span>;
  }
}
