import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Battery from '../components/Battery';
import StatusBar from '../components/StatusBar';

import styles from 'styles/App.scss';

const menuItems = [
    { route: '/', text: 'Home' },
    { route: '/plot', text: 'Lidar View' },
    { route: '/log', text: 'Log' },
    { route: '/schedule', text: 'Schedule' }
];
@connect(state => ({
  charger: state.charger,
  activity: state.activity
}))

export default class IndexPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    charger: PropTypes.object,
    activity: PropTypes.object
  };

  render() {
    const { charger, activity } = this.props;
    return (
      <div className={styles.parent}>
        <AppBar title="Sweeto" onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle()}
          iconElementRight={<Battery charger={charger}/>}/>
        <LeftNav ref="leftNav" menuItems={menuItems} docked={false} onChange={this.onMenuChange.bind(this)}/>

        <div className={styles.childContainer}>
          {this.props.children}
        </div>

        <StatusBar activity={activity}/>
      </div>
    );
  }

  onMenuChange(e, key, payload) {
    const { dispatch } = this.props;
    dispatch(pushState(null, payload.route));
  }
}
