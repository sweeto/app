import React, { Component } from 'react';
import MqttLoginBox from '../components/MqttLoginBox';

import styles from 'styles/LoginPage.scss';

export default class LoginPage extends Component {
  render() {
    return (
      <div className={styles.parent}>
        <MqttLoginBox className={styles.loginBox} />
      </div>
    );
  }
}
