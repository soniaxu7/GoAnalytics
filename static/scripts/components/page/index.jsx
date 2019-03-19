import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';

class Page extends React.Component {
  constructor(props) {
    super(props);

    const name = props.match.params.name;
    this.state = {
      loading: true,
      data: [],
      name
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

  getCorrelation(str) {
    return String(Number(str).toFixed(4)*100).substring(0, 5) + ' %';
  }

  render() {
    let {data, name, loading} = this.state; 
    data = data.filter((item) => item.correlation != 'None');

    return (
      <div>
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
        {// <a href="/api/get_csv">
        //   <Button size="sm">Download</Button>
        // </a>
        }
        {
          loading ?
            <div style={{height: '300px'}}>
              <div className="icon-loading" style={{margin: '220px auto'}} ></div>
            </div> :
            <Table striped bordered hover style={{marginTop: '20px'}} >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Col 1</th>
                  <th>Col 2</th>
                  <th>Relations</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {item.col_1}
                    </td>
                    <td>
                      {item.col_2}
                    </td>
                    <td>
                      {this.getCorrelation(item.correlation)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        }
      </div>
    );
  }
}

export default Page;
