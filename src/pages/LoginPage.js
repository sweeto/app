import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { mqttLogin } from '../actions/MqttAction';
import * as MqttStates from '../constants/MqttStates';
import MqttLoginBox from '../components/MqttLoginBox';
import CircularProgress from 'material-ui/lib/circular-progress';

import styles from 'styles/LoginPage.scss';

@connect(state => ({
  mqtt: state.mqtt
}))
export default class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    mqtt: PropTypes.object
  };

  render() {
    const { mqtt } = this.props;

    return (
      <div className={styles.parent}>
        {() => {
          if (mqtt.get('state') === MqttStates.PENDING) {
            return <CircularProgress mode="indeterminate" />;
          }
          return (
            <MqttLoginBox
              className={styles.loginBox}
              onLogin={this.onLogin.bind(this)} />
          );
        }()}
      </div>
    );
  }

  onLogin(address, username, password) {
    const { dispatch } = this.props;
    dispatch(mqttLogin(address, username, password));
  }
}
