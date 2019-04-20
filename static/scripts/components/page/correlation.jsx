import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';

class Correlation extends React.Component {
  constructor(props) {
    super(props);
  }

  getCorrelation(str) {
    return String(Number(str).toFixed(4)*100).substring(0, 5) + ' %';
  }
  
  render() {
    const allData = this.props.data;
    const data = allData.filter((item) => item.col_1.substring(0, 7) != item.col_2.substring(0, 7));

    return (
      <Table striped bordered hover style={{marginTop: '20px'}} >
        <thead>
          <tr>
            <th>#</th>
            <th>Name of Index 1</th>
            <th>Name of Index 2</th>
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
    );
  }
}

export default Correlation;
