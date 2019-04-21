import React from 'react';
import {Table} from 'react-bootstrap';
import request from '../../../request';

class Correlation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.getRelations = this.getRelations.bind(this);
  }
  
  // if the current page should load another dataset, it requires backend request
  UNSAFE_componentWillReceiveProps(nextProps) {
    const name = nextProps.name;
    this.getRelations(name);
  }

  // when the first time load component, it should retrieve backend data
  componentDidMount() {
    const name = this.props.name;
    this.getRelations(name);
  }

  getRelations(name) {
    request.getRelations(name).then((res) => {
      this.setState({
        loading: false,
        data: res
      });
    });
  }

  // display correlation by percentage
  getPercentage(str) {
    return String(Number(str).toFixed(4)*100).substring(0, 5) + ' %';
  }
  
  render() {
    const allData = this.state.data;
    const loading = this.state.loading;

    // if the columns are from same model, ignore them
    const data = allData.filter((item) => (item.correlation != 'None' && 
      (item.col_1.substring(0, 7) != item.col_2.substring(0, 7))));

    return (
      loading ?
        <div style={{height: '300px'}}>
          <div className="icon-loading" style={{margin: '220px auto'}} ></div>
        </div> :
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
                  {this.getPercentage(item.correlation)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    );
  }
}

export default Correlation;
