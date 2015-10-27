import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import styles from 'styles/MqttLoginBox.scss';

export default class MqttLoginBox extends Component {
  render() {
    return (
      <Paper zDepth={1}>
        <div className={styles.parent}>
          <h2>Login</h2>

          <form onSubmit={this.onSubmit.bind(this)}>
            <TextField
              fullWidth
              ref="address"
              hintText="m20.cloudmqtt.com"
              floatingLabelText="MQTT Broker address" />
            <TextField
              fullWidth
              ref="username"
              hintText="Broker Username"
              floatingLabelText="Username" />
            <TextField
              fullWidth
              ref="password"
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

    const address = this.refs.address.getValue().trim();
    const username = this.refs.username.getValue().trim();
    const password = this.refs.password.getValue().trim();

    console.log(address, username, password);
  }
}
