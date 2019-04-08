import React from 'react';
import { ToggleButtonGroup, ToggleButton, 
  ButtonToolbar, Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';

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
    };

    this.getColumnNames = this.getColumnNames.bind(this);
    this.handleInitiative = this.handleInitiative.bind(this);
    this.handleRegulation = this.handleRegulation.bind(this);
    this.handleSociety = this.handleSociety.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getColumnNames()
  }

  componentDidMount() {
    this.getColumnNames()
  }

  getColumnNames() {
    request.getColumnNames('Hello_world').then((res) => {
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

  render() {
    const {initiative, regulation, society} = this.state;

    return (
      <div>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Initiative:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_initiative}
              onChange={this.handleInitiative}
            >
              {initiative.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Regulation:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_regulation}
              onChange={this.handleRegulation}
            >
              {regulation.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Society:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_society}
              onChange={this.handleSociety}
            >
              {society.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <div>
          <Button size="sm">Confirm</Button>
        </div>
      </div>
    );
  }
}

export default Trend;
