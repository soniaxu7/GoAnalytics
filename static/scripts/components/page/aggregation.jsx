import React from 'react';
import { ToggleButtonGroup, ToggleButton, ButtonToolbar, Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';
import Chart from 'chart.js';

class Aggregation extends React.Component {
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
      data: [],
      dataKeys: [],
      summaryData: [],
      summaryKeys: ['Indicator', 'Average', 'Min', 'Max'],
      loading: true,
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

  getTableKeys(res) {
    var keys = [];

    if (res.length > 0) {
      keys = ['year'].concat(Object.keys(res[0]).filter((key) => key != 'year'));
    }

    return keys;
  }

  getSummaryData(res, keys) {
    let data = [];

    if (res.length > 0) {
      keys.forEach((key) => {
        if (key != 'year') {
          let average = res.map((item) => item[key]).reduce((a,b) => a+b) / res.length;
          let min = res.map((item) => item[key]).reduce((a,b) => a < b ? a : b);
          let max = res.map((item) => item[key]).reduce((a,b) => a > b ? a : b);

          data.push({
            Indicator: key,
            Average: average,
            Min: min,
            Max: max
          });
        }
      });
    }

    return data;
  }

  onConfirm() {
    this.setState({
      loading: true,
    });

    var data = {};
    const {name, selected_society, selected_regulation, selected_initiative} = this.state;

    data['name'] = name;
    data['initiative'] = selected_initiative.slice(0);
    data['regulation'] = selected_regulation.slice(0);
    data['society'] = selected_society.slice(0);

    request.getColumnData(data).then((res) => {
      const dataKeys = this.getTableKeys(res);
      const summaryData = this.getSummaryData(res, dataKeys);

      this.setState({
        loading: false,
        data: res,
        dataKeys: dataKeys,
        summaryData: summaryData
      });
    });

  }

  render() {
    const {initiative, regulation, society, loading, data, dataKeys, summaryData, summaryKeys} = this.state;

    console.log('summaryKeys', summaryKeys)
    console.log('summaryData', summaryData)

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
          loading ?
            null : 
            <div style={{marginTop: '12px'}}>
              <h3>Overview</h3>
              <Table striped bordered hover style={{marginTop: '20px'}} >
                <thead>
                  <tr>
                    {dataKeys.map((key) => 
                      <th key={key}>
                        {key == 'year' ? 'Year' : key}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, index) => (
                      <tr key={index}>
                        {
                          dataKeys.map((key) => 
                            <td key={key}>
                              {item[key]}
                            </td>
                          )
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </Table>

              <h3>Summary</h3>
              <Table striped bordered hover style={{marginTop: '20px'}} >
                <thead>
                  <tr>
                    {summaryKeys.map((key) => 
                      <th key={key}>
                        {key}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    summaryData.map((item, index) =>
                      <tr key={index}>
                      {
                        summaryKeys.map((key) => (
                          <td key={key}>
                            {item[key]}
                          </td>
                        ))
                      }
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </div>
        }
      </div>
    );
  }
}

export default Aggregation;
