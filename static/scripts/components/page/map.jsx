import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, Container, Row, Col, Table, ToggleButtonGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';
import request from '../../../request';
import Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';

// Highcharts: all the information of Canada map
const mapData = require('../../../lib/ca-all.js');

// need to initialize before using map
HC_map(Highcharts);

/*
* Reference:
* https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/ca/ca-all
* canada map data: https://code.highcharts.com/mapdata/countries/ca/ca-all.js
*/
class Map extends React.Component {
  constructor(props) {
    super(props);

    const mapOptions = {
      // title of the map
      title: {
        text: 'Canada'
      },
      // gradation color of the map
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
            mapData: mapData, // Canada Map data
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            name: 'Canada',
            data: []    // data of the dataset
        }]
    };

    this.state = {
      name: this.props.name,
      years: [],        // all the years
      type: undefined,  // Initiative, Regulation or Society
      year: undefined,  // selected year
      loading: true,
      options: mapOptions,  // all the map data
    };
  }

  // when the dataset changes, retrieve all the years of the new dataset
  UNSAFE_componentWillReceiveProps(nextProps) {
    const name = nextProps.name;
    this.getYears(name);
  }

  // when first time load the component, retrieve all the years of the new dataset
  componentDidMount() {
    const name = this.state.name;
    this.getYears(name);
  }

  // get all the Years
  getYears(name) {
    request.getYears(name).then((res) => {
      this.setState({
        name,
        years: res,
      });
    });
  }

  // get all the data of the selected year
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
            <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Initiative:</Col>
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
            <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Regulation</Col>
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
            <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Society</Col>
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
        </div>
        {
          // The data map components
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
