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
    const dist = Math.round((activity.get('lwheeldist') + activity.get('rwheeldist')) / 2 / 1000);

    let end = activity.get('end');
    if (!end) {
      end = Date.now() / 1000;
    }
    let duration = end - start;
    const hours = Math.floor(duration / 3600);
    duration = Math.round(duration % 3600);
    const min = Math.floor(duration / 60);
    const sec = Math.round(duration % 60);
    let timestamp = '';

    if (hours > 0) {
      timestamp = timestamp + hours + ' hours ';
    }
    timestamp = timestamp + min + ' min ' + sec + ' sec';

    let distance = '';
    if (dist > 0) {
      distance = ' | ' + dist + ' meters';
    }

    return (
      <Paper zDepth={5} className={styles.parent}>
        <p>
          {state} for {timestamp} {distance}
        </p>
      </Paper>
    );
  }
}
