import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import styles from '../styles/StatusBar';

export default class StatusBar extends Component {
  static propTypes = {
    activity: PropTypes.object
  }
  render() {
    const { activity } = this.props;
    const state = activity.get('state');
    const start = activity.get('start');
    let end = activity.get('end');
    if (!end) {
      end = Date.now() / 1000;
    }
    const duration = end - start;
    const min = Math.floor(duration / 60);
    const sec = Math.round(duration % 60);
    return (
      <Paper zDepth={5} className={styles.parent}>
        <p>{state} for {min}min {sec} secs</p>
      </Paper>
    );
  }
}
