import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, Container, Row, Col, Table, ToggleButtonGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';

import request from '../../../request';

import Highcharts from 'highcharts'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

const mapData = require('./ca-all');

HC_map(Highcharts)

// https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/ca/ca-all
// canada map data: https://code.highcharts.com/mapdata/countries/ca/ca-all.js

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

class Map extends React.Component {
  constructor(props) {
    super(props);

    const mapOptions = {
      title: {
        text: 'Canada'
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

    this.state = {
      name: this.props.name,
      years: [],
      type: undefined,
      year: undefined,
      loading: true,
      options: mapOptions,
      // initiative: [],
      // regulation: [],
      // society: [],
    };

    // this.handleInitiative = this.handleInitiative.bind(this);
    // this.handleRegulation = this.handleRegulation.bind(this);
    // this.handleSociety = this.handleSociety.bind(this);
    // this.onConfirm = this.onConfirm.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getYears();
  }

  componentDidMount() {
    this.getYears();
  }

  // handleInitiative(value, event) {
  //   this.setState({
  //     initiative: value,
  //   });
  // }

  // handleRegulation(value, event) {
  //   this.setState({
  //     regulation: value,
  //   });
  // }

  // handleSociety(value, event) {
  //   this.setState({
  //     society: value,
  //   });
  // }

  getYears(data) {
    const name = this.props.name;

    request.getYears(name).then((res) => {
      this.setState({
        name,
        years: res,
      });
    });
  }

  getYearData(data) {
    request.getYearData(data).then((res) => {
      let options = Object.assign({}, this.state.options);
      options.series[0].data = res.data;

      this.setState({
        options,
        loading: false,
      });
    });
  }

  handleYear(type, year) {
    this.setState({
      type,
      year,
      loading: true
    });

    const name = this.props.name;
    this.getYearData({name, year, type});
  }

  render() {
    const {years, loading, options, type, year} = this.state;
    const currentYear = year;

    return (
      <div>
        <div>
          <Row style={{marginBottom: '6px'}}>
            <Col sm="1">Initiative:</Col>
            <Col sm="10">
              <ButtonGroup aria-label="Basic example">
                {years.map((year) => {
                  const isCurrent = type == 'initiative' && currentYear == year;

                  return (
                    <Button size="sm"
                      variant={isCurrent ? "dark" : "outline-dark"}
                      key={year} onClick={this.handleYear.bind(this, 'initiative', year)}>{year}</Button>
                  );
                })}
              </ButtonGroup>
            </Col>
          </Row>
          <Row style={{marginBottom: '6px'}}>
            <Col sm="1">Initiative:</Col>
            <Col sm="10">
              <ButtonGroup aria-label="Basic example">
                {years.map((year) => {
                  const isCurrent = type == 'regulation' && currentYear == year;

                  return (
                    <Button size="sm"
                      variant={isCurrent ? "dark" : "outline-dark"}
                      key={year} onClick={this.handleYear.bind(this, 'regulation', year)}>{year}</Button>
                  );
                })}
              </ButtonGroup>
            </Col>
          </Row>
          <Row style={{marginBottom: '6px'}}>
            <Col sm="1">Initiative:</Col>
            <Col sm="10">
              <ButtonGroup aria-label="Basic example">
                {years.map((year) => {
                  const isCurrent = type == 'society' && currentYear == year;

                  return (
                    <Button size="sm"
                      variant={isCurrent ? "dark" : "outline-dark"}
                      key={year} onClick={this.handleYear.bind(this, 'society', year)}>{year}</Button>
                  );
                })}
              </ButtonGroup>
            </Col>
          </Row>
          {/*<Row style={{marginBottom: '6px'}}>
            <Col sm="1">Regulation:</Col>
            <Col sm="10">
              <ToggleButtonGroup
                type="checkbox"
                value={this.state.regulation}
                onChange={this.handleRegulation}
              >
                {years.map((year) => 
                  <ToggleButton variant="outline-dark" size="sm" value={year} key={year}>{year}</ToggleButton>
                )}
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row style={{marginBottom: '6px'}}>
            <Col sm="1">Society:</Col>
            <Col sm="10">
              <ToggleButtonGroup
                type="checkbox"
                value={this.state.society}
                onChange={this.handleSociety}
              >
                {years.map((year) => 
                  <ToggleButton variant="outline-dark" size="sm" value={year} key={year}>{year}</ToggleButton>
                )}
              </ToggleButtonGroup>
            </Col>
          </Row>
          <div>
            <Button size="sm" onClick={this.onConfirm}>Confirm</Button>
          </div>
        */}
        </div>
        {
          loading ?
            null :
            <div style={{width: '1000px', height: '800px'}}>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={'mapChart'}
                options={options}
                allowChartUpdate={true}
                updateArgs={[true, true, true]}
              />
            </div>
        }
      </div>
    );
  }
}

export default connect()(Map)
