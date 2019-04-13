import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';


import Correlation from './correlation';
import Aggregation from './aggregation';
import Trend from './trend';

class Page extends React.Component {
  constructor(props) {
    super(props);

    const name = props.match.params.name;
    this.state = {
      loading: true,
      data: [],
      name,
      page: 'correlation'
    };

    this.update_relations(name);
  }

  update_relations() {
    setTimeout(() => {
      request.get_relations(this.state.name).then((res) => {
        this.setState({
          loading: false,
          data: res
        });
      });
    }, 500);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const new_name = nextProps.match.params.name;

    if (this.state.name != new_name) {
      this.update_relations(new_name);

      this.setState({
        loading: true,
        name: new_name
      });
    }
  }

  onClickPage(page) {
    this.setState({
      page
    });
  }

  getPage() {
    let {data, name, loading, page} = this.state; 
    data = data.filter((item) => item.correlation != 'None');

    switch(page) {
      case 'aggregation':
        return (<Aggregation name={name} />);
      case 'correlation':
        return (<Correlation data={data} />);
      case 'trend':
        return (<Trend name={name} />);
      default:
        return (<div>defaultpage</div>);
    }

  }

  render() {
    let {data, name, loading} = this.state; 

    return (
      <div>
      {/*
        <Container>
          <Row>
            <Col sm="2">Initiative</Col>
            <Col sm="4">
              {`${name}_initiative.csv`}
            </Col>
          </Row>
          <Row>
            <Col sm="2">Regulation</Col>
            <Col sm="4">
              {`${name}_regulation.csv`}
            </Col>
          </Row>
          <Row>
            <Col sm="2">Society</Col>
            <Col sm="4">
              {`${name}_society.csv`}
            </Col>
          </Row>
          <Row>
            <Col sm="2">Merged by</Col>
            <Col sm="4">Year</Col>
          </Row>
        </Container>
      */}
        <div style={{marginBottom: '12px'}}>
          <Button size="sm" onClick={this.onClickPage.bind(this, 'aggregation')}>Aggregation</Button>
          <Button size="sm" onClick={this.onClickPage.bind(this, 'trend')}>Trend</Button>
          <Button size="sm" onClick={this.onClickPage.bind(this, 'correlation')}>Correlation</Button>
        </div>
        {
          loading ?
            <div style={{height: '300px'}}>
              <div className="icon-loading" style={{margin: '220px auto'}} ></div>
            </div> :
            this.getPage()
        }
      </div>
    );
  }
}

export default Page;
