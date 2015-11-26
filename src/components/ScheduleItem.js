import React, { Component, PropTypes } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'react-toolbox/lib/font_icon';


export default class ScheduleItem extends Component {
    static propTypes = {
      schedule: PropTypes.object
    }

  render() {
    const { schedule } = this.props;
    console.log('ScheduleItem Schedule:', schedule);
    return (
      <ListItem primaryText={schedule.get('day')} secondaryText={schedule.get('time', '--')}
        leftIcon={<FontIcon value="edit" />}/>
    );
  }
}
