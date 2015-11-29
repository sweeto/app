import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Battery from '../components/Battery';
import LidarChart from '../components/LidarChart';
import Motors from '../components/Motors';

import styles from 'styles/IndexPage.scss';

@connect(state => ({
  charger: state.charger,
  lds: state.lds,
  motors: state.motors
}))
export default class PlotPage extends Component {
  static propTypes = {
    charger: PropTypes.object,
    lds: PropTypes.object,
    motors: PropTypes.object
  }


  render() {
    const { charger, lds, motors } = this.props;

    // This is just a way of finding out if we have any data yet
    if (!charger.get('VBattV')) {
      return this.renderLoading();
    }

    return (
      <div className={styles.parent}>
        <Battery charger={charger}/>
        <Motors motors={motors}/>
        <LidarChart
          ldsData={lds}
        />
      </div>
    );
  }

  renderLoading() {
    return <span>Waiting for first measurement ...</span>;
  }
}
