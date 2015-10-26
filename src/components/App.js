import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

import styles from 'styles/main.scss';

const menuItems = [
  { route: '/', text: 'Home' },
  { route: '/todos', text: 'Todos' }
];

@connect(() => ({}))
export default class IndexPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={styles.parent}>
        <AppBar title="Sweeto"
          onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() } />
        <LeftNav ref="leftNav" menuItems={menuItems} docked={false} onChange={this.onMenuChange.bind(this)}/>
        {this.props.children}
      </div>
    );
  }

  onMenuChange(e, key, payload) {
    const { dispatch } = this.props;
    dispatch(pushState(null, payload.route));
  }
}
