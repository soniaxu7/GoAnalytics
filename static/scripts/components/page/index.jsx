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
    request.get_relations(this.state.name).then((res) => {
      this.setState({
        loading: false,
        data: res
      });
    });
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

  render() {
    const {data, name, loading} = this.state; 

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
            <div style={{height: '120px'}}>
              <div className="icon-loading" style={{margin: '20px auto'}} ></div>
            </div> :
            <Table striped bordered hover>
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
                    {item.correlation}
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
