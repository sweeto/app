import React, { Component, PropTypes } from 'react';
import Button from 'react-toolbox/lib/button';
import Switch from 'react-toolbox/lib/switch';

import styles from 'styles/Joystick.scss';

export default class Joystick extends Component {
  static propTypes = {
    onDrive: PropTypes.func.isRequired
  };
  state = {
    switch: [true, false]
  };

  handleChange = (index) => {
    const state = this.state.switch;
    state[index] = !state[index];
    this.setState({switch: state});
  };

  render() {
    const { onDrive } = this.props;

    return (
      <div className={styles.parent}>
        <div className={styles.row}>
          <Button icon="keyboard-arrow-up" floating accent onClick={() => onDrive('f')} />
        </div>
        <div className={styles.row}>
          <Button icon="keyboard-arrow-left" floating accent onClick={() => onDrive('l')}/>
          <Button icon="keyboard-arrow-right" floating accent onClick={() => onDrive('r')}/>
        </div>
        <div className={styles.row}>
          <Button icon="keyboard-arrow-down" floating accent onClick={() => onDrive('b')}/>
        </div>
        <div className={styles.row_right}>
          <Switch
              checked={this.state.switch[0]}
              label="Vacuum"
              onChange={this.handleChange.bind(this, 0)}
              />
          <Switch
              checked={this.state.switch[1]}
              label="Brush"
              onChange={this.handleChange.bind(this, 1)}
              />
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} icon="play-circle-outline" label="Clean" raised primary onClick={() => onDrive('clean')}/>
          <Button className={styles.button} icon="add-circle-outline" label="Spot" raised primary onClick={() => onDrive('park')}/>
          <Button className={styles.button} icon="stop" label="Stop" raised primary onClick={() => onDrive('clean')}/>
          <Button className={styles.button} icon="home" label="Park" raised primary onClick={() => onDrive('park')}/>
        </div>
      </div>
    );
  }
}
