import React, { Component, PropTypes } from 'react';
import { ScatterChart } from 'react-d3';

const toCartesian = (mea) => {
  const rad = -mea.get('deg') * Math.PI / 180;
  return {
    x: mea.get('dist') * Math.sin(rad) / 1000,
    y: mea.get('dist') * Math.cos(rad) / 1000,
    i: mea.get('int')
  };
};

const colorFn = c => c;

const colorAccessor = (dataPoint) => {
  const intensity = dataPoint.i;

  if (!intensity) {
    return 'grey';
  }

  const MIN = 400;
  const MAX = 800;
  const linear = Math.max(Math.min((intensity - MIN) / (MAX - MIN), 1.0), 0.0);

  const color = `rgb(${Math.floor(255 - 255 * linear)}, ${Math.floor(256 * linear)}, 0)`;

  return color;
};

export default class LidarChart extends Component {
  static propTypes = {
    ldsData: PropTypes.object.isRequired
  };

  render() {
    /* eslint id-length:0 */
    const { ldsData } = this.props;

    const normalReadings = ldsData
      .filter(mea => !mea.get('err'))
      .filter(mea => mea.get('dist') < 1.1e4)
      .map(toCartesian);


    const scatterData = [
      {
        name: 'Lidar',
        values: normalReadings.toJS(),
        colors: ['red'],
        circleRadius: 50
      },
      {
        name: 'Neato',
        values: [
          { x: 0, y: 0 }
        ]
      },
      {
        name: 'dust',
        values: [
          { x: -5, y: -5 },
          { x: 5, y: 5 }
        ]
      }
    ];

    return (
      <ScatterChart
        data={scatterData}
        width={800}
        height={800}
        colors={colorFn}
        colorAccessor={colorAccessor}
        gridHorizontal
        girdVertical
        legend
        label
        title="Lidar data"
      />
    );
  }
}
