import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { mqttLogin } from '../actions/ConnectionAction';
import * as ConnectionStates from '../constants/ConnectionStates';
import MqttLoginBox from '../components/MqttLoginBox';
import CircularProgress from 'material-ui/lib/circular-progress';

import styles from 'styles/LoginPage.scss';

@connect(state => ({
  connection: state.connection
}))
export default class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    connection: PropTypes.object
  };

  render() {
    const { connection } = this.props;

    return (
      <div className={styles.parent}>
        {() => {
          if (connection.get('state') === ConnectionStates.PENDING) {
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
