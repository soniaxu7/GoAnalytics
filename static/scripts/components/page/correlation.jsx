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
  getPercentage(number) {
    return String(number.toFixed(4)*100).substring(0, 5) + ' %';
  }
  
  startWith(str) {
    var reg = new RegExp('^'+str);
    return reg.test(this);
  }

  filterData(data) {
    // filter invalid result
    data = data.filter((item) => (item.correlation != 'None'));

    // transform correlation from String to Int, then sort list by descending correlation order
    data = data.map((item) => Object.assign({}, item, {'correlation': Number(item.correlation)}));
    data.sort((a, b) => b.correlation - a.correlation);

    // filter useless correlation and leave
    // from initiatives to regulations
    // from regulations to society
    // from initiatives to society.
    const validCorr = {
      'Initiative': ['Regulation', 'Society'],
      'Regulation': ['Society'],
    };
    data = data.filter((item) => {
      let start1 = item.col_1.substring(0, 10);
      if (validCorr[start1]) {
        for (let start2 of validCorr[start1]) {
          if (start2 == item.col_2.substring(0, start2.length)) {
            return true;
          }
        }
      }

      return false;
    });

    // limit the length of list to 30
    const MAX_LENGTH = 30;
    if (data.length > MAX_LENGTH) {
      data.length = MAX_LENGTH;
    }

    return data;
  }

  render() {
    let data = this.state.data;
    const loading = this.state.loading;

    // filter unnecessary results
    data = this.filterData(data);

    return (
      loading ?
        <div style={{height: '300px'}}>
          <div className="icon-loading" style={{margin: '220px auto'}} ></div>
        </div> :
        <Table striped bordered hover style={{marginTop: '20px'}} >
          <thead>
            <tr>
              <th>#</th>
              <th>Source Element</th>
              <th>Target Element</th>
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
