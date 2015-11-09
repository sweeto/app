import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import styles from 'styles/MqttLoginBox.scss';

export default class MqttLoginBox extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
    defaults: PropTypes.object
  };

  static defaultProps = {
    defaults: Map({
      address: '',
      port: '',
      username: '',
      password: ''
    })
  };

  render() {
    const { defaults } = this.props;

    return (
      <Paper zDepth={1}>
        <div className={styles.parent}>
          <h2>Login</h2>

          <form onSubmit={this.onSubmit.bind(this)}>
            <div className={styles.addressPortContainer}>
              <div className={styles.address}>
                <TextField
                  fullWidth
                  ref="address"
                  value={defaults.get('address')}
                  hintText="m20.cloudmqtt.com"
                  floatingLabelText="MQTT Broker address" />
              </div>
              <div className={styles.port}>
                <TextField
                  fullWidth
                  ref="port"
                  hintText="19232"
                  value={defaults.get('port')}
                  type="number"
                  floatingLabelText="Port" />
              </div>
            </div>
            <TextField
              fullWidth
              ref="username"
              value={defaults.get('username')}
              hintText="Broker Username"
              floatingLabelText="Username" />
            <TextField
              fullWidth
              ref="password"
              value={defaults.get('password')}
              hintText="Broker Password"
              floatingLabelText="Password"
              type="password" />

            <div className={styles.bottom}>
              <RaisedButton
                label="Log in"
                type="submit" />
            </div>
          </form>
        </div>
      </Paper>
    );
  }

  onSubmit(event) {
    event.preventDefault();

    const { onLogin } = this.props;
    const address = this.refs.address.getValue().trim();
    const port = Number.parseInt(this.refs.port.getValue().trim(), 10);
    const username = this.refs.username.getValue().trim();
    const password = this.refs.password.getValue().trim();

    if (onLogin) {
      onLogin(address, port, username, password);
    }
  }
}
