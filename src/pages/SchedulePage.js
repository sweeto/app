import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import Switch from 'react-toolbox/lib/switch';
import ScheduleItem from '../components/ScheduleItem';

import { mqttPost } from '../actions/ConnectionAction';


@connect(state => ({
  schedule: state.schedule
}))

export default class SchedulePage extends Component {
  static propTypes = {
    schedule: PropTypes.object
  }
  handleChange = () => {
    const { schedule } = this.props;
    console.log('handleChange:', schedule.get('active'));
    mqttPost('neato/commands', JSON.stringify( {cmd: 'SetSchedule', kwargs: {active: !schedule.get('active')}} ));
  };

  render() {
    const { schedule } = this.props;

    return (
      <div>
        <Switch label="Active" checked={schedule.get('active')} onChange={this.handleChange.bind(this)}/>
        <List>
          <ListDivider />
          <ScheduleItem schedule={schedule.get('days').get(1)} />
          <ScheduleItem schedule={schedule.get('days').get(2)} />
          <ScheduleItem schedule={schedule.get('days').get(3)} />
          <ScheduleItem schedule={schedule.get('days').get(4)} />
          <ScheduleItem schedule={schedule.get('days').get(5)} />
          <ScheduleItem schedule={schedule.get('days').get(6)} />
          <ScheduleItem schedule={schedule.get('days').get(0)} />
        </List>
      </div>
    );
  }
}
