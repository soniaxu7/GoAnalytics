import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import request from '../../../request';

class Aggregation extends React.Component {
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
      data: [],
      dataKeys: [],
      summaryData: [],
      summaryKeys: ['Indicator', 'Average', 'Min', 'Max'], // pre-defined overview columns
      loading: true,
      loadingGlobal: true,    // flag if it needs to display overview table
    };

    // should .bind(this) otherwise "this" doesn't work in the function
    this.getColumnNames = this.getColumnNames.bind(this);
    this.handleInitiative = this.handleInitiative.bind(this);
    this.handleRegulation = this.handleRegulation.bind(this);
    this.handleSociety = this.handleSociety.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.updateDataset = this.updateDataset.bind(this);
  }

  // if the current page should load another dataset, it requires backend request
  UNSAFE_componentWillReceiveProps(nextProps) {
    const name = nextProps.name;
    this.updateDataset(name);
  }

  // when the first time load component, it should retrieve backend data
  componentDidMount() {
    const name = this.props.name;
    this.updateDataset(name);
  }

  updateDataset(name) {
    this.setState({
      selected_initiative: [],
      selected_regulation: [],
      selected_society: [],
      loading: true,
      loadingGlobal: true
    }, () => {
      this.getColumnNames(name);
    });
  }

  removeElement(list, item) {
    let index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  getColumnNames(name) {
    this.setState({
      loading: true,
    });

    // this is a Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    // after getting data, update the page
    request.getColumnNames(name).then((res) => {
      this.removeElement(res.initiative_columns, 'Year');
      this.removeElement(res.regulation_columns, 'Year');
      this.removeElement(res.society_columns, 'Year');

      this.setState({
        name: res.name,
        initiative: res.initiative_columns,
        regulation: res.regulation_columns,
        society: res.society_columns,
        loadingGlobal: false,
      });
    });
  }

  // store what users selected in the initiative columns
  handleInitiative(value, event) {
    this.setState({
      selected_initiative: value,
    });
  }

  // store what users selected in the regulation columns
  handleRegulation(value, event) {
    this.setState({
      selected_regulation: value,
    });
  }

  // store what users selected in the society columns
  handleSociety(value, event) {
    this.setState({
      selected_society: value,
    });
  }

  // retrieve all years in order to display overview by Year
  getTableKeys(res) {
    var keys = [];

    if (res.length > 0) {
      keys = ['year'].concat(Object.keys(res[0]).filter((key) => key != 'year'));
    }

    return keys;
  }

  // calculate summary data
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

  // when click confirm button, retrieve columns user selected and request backend data
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

    // Promise request
    // update the page with data and stop loading
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
    const {initiative, regulation, society, loading, data, dataKeys, summaryData, summaryKeys, loadingGlobal} = this.state;

    return (
      loadingGlobal ?
        <div style={{height: '300px'}}>
          <div className="icon-loading" style={{margin: '220px auto'}} ></div>
        </div> :
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
              <div style={{marginTop: '12px', maxWidth: '1120px'}}>
                <div style={{width: '570px'}}>
                  <Alert variant="info">
                    The table data is displayed by Year.
                  </Alert>
                </div>
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
