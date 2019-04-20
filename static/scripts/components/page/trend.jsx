import React from 'react';
import { ToggleButtonGroup, ToggleButton, 
  ButtonToolbar, Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';
// import * as d3 from 'd3';
import Chart from 'chart.js';

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      initiative: [],
      selected_initiative: [],
      regulation: [],
      selected_regulation: [],
      society: [],
      selected_society: [],
      loadingChart: true,
    };

    this.getColumnNames = this.getColumnNames.bind(this);
    this.handleInitiative = this.handleInitiative.bind(this);
    this.handleRegulation = this.handleRegulation.bind(this);
    this.handleSociety = this.handleSociety.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getColumnNames();
  }

  componentDidMount() {
    this.getColumnNames();
    // this.drawChart();
  }

  drawChart(data) {
    const {x, y} = data;

    var ctx = document.getElementById('myChart');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: y
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }

  getColumnNames() {
    const name = this.props.name;

    request.getColumnNames(name).then((res) => {
      this.setState({
        name: res.name,
        initiative: res.initiative_columns,
        regulation: res.regulation_columns,
        society: res.society_columns
      });
    });
  }

  handleInitiative(value, event) {
    this.setState({
      selected_initiative: value,
    });
  }

  handleRegulation(value, event) {
    this.setState({
      selected_regulation: value,
    });
  }

  handleSociety(value, event) {
    this.setState({
      selected_society: value,
    });
  }

  generateChartData(data) {
    const colors = ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'];
    const colorsBorder = ['rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'];
    let colorIndex = 0;

    var xAxis = [];
    data.forEach((item) => {
      xAxis.push(item['year']);
    });

    var yDataset = []
    var keys = Object.keys(data[0]);
    for (let key of keys) {
      if (key != 'year') {
        let dataset = []
        for (let item of data) {
          dataset.push(item[key]);
        }

        let y = {
          label: key,
          data: dataset,
          backgroundColor: colors[colorIndex],
          borderColor: colorsBorder[colorIndex],
          borderWidth: 1
        };
        colorIndex += 1;

        yDataset.push(y);
      }
    }

    var res = {
      'x': xAxis,
      'y': yDataset
    }

    return res;
  }

  onConfirm() {
    this.setState({
      loadingChart: true,
    });

    var data = {};
    const {name, selected_society, selected_regulation, selected_initiative} = this.state;

    data['name'] = name;
    data['initiative'] = selected_initiative.slice(0);
    data['regulation'] = selected_regulation.slice(0);
    data['society'] = selected_society.slice(0);

    request.getColumnData(data).then((res) => {
      this.setState({
        loadingChart: false,
      });

      const chartData = this.generateChartData(res);
      this.drawChart(chartData);
    });

  }

  render() {
    const {initiative, regulation, society, loadingChart} = this.state;

    return (
      <div>
        <Row style={{marginBottom: '6px'}}>
          <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Initiative:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_initiative}
              onChange={this.handleInitiative}
            >
              {initiative.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>
                  {item}
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Regulation:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_regulation}
              onChange={this.handleRegulation}
            >
              {regulation.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>
                  {item}
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col style={{minWidth: '150px', maxWidth: '150px'}} sm="1">Society:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_society}
              onChange={this.handleSociety}
            >
              {society.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>
                  {item}
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <div>
          <Button size="sm" onClick={this.onConfirm}>Confirm</Button>
        </div>
        {
          loadingChart ?
            null
            : <canvas id="myChart" width="120" height="80"></canvas>
        }
      </div>
    );
  }
}

export default Trend;
