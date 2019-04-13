import React from 'react';
import * as d3 from "d3";
import {scaleLinear} from "d3-scale";
import { connect } from 'react-redux';
import Highcharts from 'highcharts'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

const mapData = require('./ca-all');

HC_map(Highcharts)

// https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/ca/ca-all
// canada map data: https://code.highcharts.com/mapdata/countries/ca/ca-all.js

class Map extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.init();
  }

  init() {
  }


  render() {
    const data =  [
    ['ca-5682', 0],
    ['ca-bc', 1],
    ['ca-nu', 2],
    ['ca-nt', 3],
    ['ca-ab', 4],
    ['ca-nl', 5],
    ['ca-sk', 6],
    ['ca-mb', 7],
    ['ca-qc', 8],
    ['ca-on', 9],
    ['ca-nb', 10],
    ['ca-ns', 11],
    ['ca-pe', 12],
    ['ca-yt', 13]
];

    const mapOptions = {
      title: {
        text: ''
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
      series: [{
            mapData: mapData,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            name: 'Canada',
            data: data
        }]
    }

    return (
        <div style={{width: '1000px', height: '800px'}}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'mapChart'}
              options={mapOptions}
            />
        </div>
    );
  }
}

export default connect()(Map)
