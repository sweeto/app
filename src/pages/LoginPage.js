import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { mqttLogin } from '../actions/ConnectionAction';
import * as ConnectionStates from '../constants/ConnectionStates';
import MqttLoginBox from '../components/MqttLoginBox';
import CircularProgress from 'material-ui/lib/circular-progress';
import { replaceState } from 'redux-router';

import styles from 'styles/LoginPage.scss';

@connect(state => ({
  connection: state.connection,
  lastSuccessfulLogin: state.lastSuccessfulLogin
}))
export default class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    connection: PropTypes.object,
    lastSuccessfulLogin: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    const { connection, dispatch } = nextProps;

    if (connection.get('state') === ConnectionStates.CONNECTED) {
      dispatch(replaceState(null, '/'));
    }
  }

  render() {
    const { connection, lastSuccessfulLogin } = this.props;

    return (
      <div className={styles.parent}>
        {() => {
          if (connection.get('state') === ConnectionStates.PENDING) {
            return <CircularProgress mode="indeterminate" />;
          }
          return (
            <MqttLoginBox
              className={styles.loginBox}
              onLogin={this.onLogin.bind(this)}
              defaults={lastSuccessfulLogin}
            />
          );
        }()}
      </div>
    );
  }

  onLogin(address, port, username, password) {
    const { dispatch } = this.props;
    dispatch(mqttLogin(address, port, username, password));
  }
}
