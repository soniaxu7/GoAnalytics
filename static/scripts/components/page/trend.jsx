import React from 'react';
import { ToggleButtonGroup, ToggleButton, Row, Col, Button} from 'react-bootstrap';
import request from '../../../request';
import Chart from 'chart.js';

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      initiative: [],
      selected_initiative: [],
      regulation: [],
      selected_regulation: [],
      society: [],
      selected_society: [],
      loadingChart: true,
    };

    // should .bind(this) otherwise "this" doesn't work in the function
    this.getColumnNames = this.getColumnNames.bind(this);
    this.handleInitiative = this.handleInitiative.bind(this);
    this.handleRegulation = this.handleRegulation.bind(this);
    this.handleSociety = this.handleSociety.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
  }

  // if the current page should load another dataset, retrieve all the column names from backend
  UNSAFE_componentWillReceiveProps(nextProps) {
    const name = nextProps.name;
    this.updateDataset(name);
  }

  // if it is the first time load the component, retrieve all the column names from backend
  componentDidMount() {
    const name = this.state.name;
    this.updateDataset(name);
  }

  updateDataset(name) {
    this.setState({
      selected_initiative: [],
      selected_regulation: [],
      selected_society: [],
      loadingChart: true,
    }, () => {
      this.getColumnNames(name);
    });
  }

  drawChart(data) {
    const {x, y} = data;

    // DOM element to append
    var ctx = document.getElementById('myChart');

    // all the option data in charts
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

  // get column names from backend
  getColumnNames(name) {
    request.getColumnNames(name).then((res) => {
      this.setState({
        name: res.name,
        initiative: res.initiative_columns,
        regulation: res.regulation_columns,
        society: res.society_columns
      });
    });
  }

  // select columns in Initiative
  handleInitiative(value, event) {
    this.setState({
      selected_initiative: value,
    });
  }

  // select columns in Regulation
  handleRegulation(value, event) {
    this.setState({
      selected_regulation: value,
    });
  }

  // select columns in Society
  handleSociety(value, event) {
    this.setState({
      selected_society: value,
    });
  }

  generateChartData(data) {
    // chart line and dot color
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

    // define X axis by Year
    var xAxis = [];
    data.forEach((item) => {
      xAxis.push(item['year']);
    });

    // define Y axix by data
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
        colorIndex = (colorIndex + 1) % 6;

        yDataset.push(y);
      }
    }

    var res = {
      'x': xAxis,
      'y': yDataset
    };

    return res;
  }

  onConfirm() {
    this.setState({
      loadingChart: true,
    });

    // get all the selected columns
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
