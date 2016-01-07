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

  render() {
    const { charger } = this.props;

    // This is just a way of finding out if we have any data yet
    if (!charger.get('VBattV')) {
      return <div></div>;
    }

    return (
      <div className={styles.parent}>
        <Joystick onDrive={this.onDrive.bind(this)} />
      </div>
    );
  }

  onDrive(direction) {
    const driveArgs = (dir) => {
      switch (dir) {
      case 'f':
        return {cmd: 'Drive', kwargs: { LWheelDist: 300, RWheelDist: 300, Speed: 100, Accel: 100, RPM: 0 }};
      case 'r':
        return {cmd: 'Turn', kwargs: {deg: -90}};
      case 'b':
        return {cmd: 'Drive', kwargs: { LWheelDist: -300, RWheelDist: -300, Speed: 100, Accel: 100, RPM: 0 }};
      case 'l':
        return {cmd: 'Turn', kwargs: {deg: 90 }};
      case 'clean':
        return {cmd: 'Clean'};
      case 'park':
        return {cmd: 'BackToDock'};
      case 'stop':
        return {cmd: 'Clean', kwargs: {arg: 'Stop'}};

      default:
        return {};
      }
    };
    mqttPost('neato/commands', JSON.stringify(driveArgs(direction)));
  }


}
