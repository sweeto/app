import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mqttLogin } from '../actions/ConnectionAction';
import * as ConnectionStates from '../constants/ConnectionStates';
import MqttLoginBox from '../components/MqttLoginBox';
import CircularProgress from 'material-ui/lib/circular-progress';
import { replaceState } from 'redux-router';

import styles from 'styles/LoginPage.scss';

@connect(state => ({
  connection: state.connection,
  lastSuccessfulLogin: state.lastSuccessfulLogin
}), dispatch => bindActionCreators({
  replaceState,
  mqttLogin
}, dispatch))
export default class LoginPage extends Component {
  static propTypes = {
    connection: PropTypes.object,
    lastSuccessfulLogin: PropTypes.object,
    replaceState: PropTypes.func.isRequired,
    mqttLogin: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { connection, lastSuccessfulLogin } = nextProps;

    if (connection.get('state') === ConnectionStates.CONNECTED) {
      this.props.replaceState(null, '/');
    }

    if (lastSuccessfulLogin.get('address') && lastSuccessfulLogin.get('port') && lastSuccessfulLogin.get('username') && lastSuccessfulLogin.get('password')) {
      this.onLogin(lastSuccessfulLogin.get('address'), lastSuccessfulLogin.get('port'), lastSuccessfulLogin.get('username'), lastSuccessfulLogin.get('password'));
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
    this.props.mqttLogin(address, port, username, password);
  }
}
