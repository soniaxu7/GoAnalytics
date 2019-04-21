import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import request from '../../../request';
import Correlation from './correlation';
import Aggregation from './aggregation';
import Trend from './trend';
import Map from './map';

// This is the main template of the sub pages
class Page extends React.Component {
  constructor(props) {
    super(props);

    const name = props.match.params.name;
    this.state = {
      name,
      page: 'aggregation' // set default page as "aggregation"
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const new_name = nextProps.match.params.name;

    if (this.state.name != new_name) {
      this.setState({
        name: new_name
      });
    }
  }

  onClickPage(page) {
    this.setState({
      page
    });
  }

  // display page by the current tab.
  getPage() {
    let {name, page} = this.state; 

    // let subpage knows what is the name of the dataset of current page
    switch(page) {
      case 'aggregation':
        return (<Aggregation name={name} />);
      case 'correlation':
        return (<Correlation name={name} />);
      case 'trend':
        return (<Trend name={name} />);
      case 'map':
        return (<Map name={name} />);
      default:
        return (<div>defaultpage</div>);
    }
  }

  // switch the page when user clicks
  onClickPageTest(page) {
    this.setState({
      page
    });
  }

  render() {
    let {page} = this.state; 

    return (
      <div>
        <div style={{marginBottom: '16px'}}>
          <Tabs defaultActiveKey={page} id="uncontrolled-tab-example" onSelect={this.onClickPageTest.bind(this)}>
            <Tab eventKey="aggregation" title="Aggregation" />
            <Tab eventKey="trend" title="Trend" />
            <Tab eventKey="correlation" title="Correlation" />
            <Tab eventKey="map" title="Map" />
          </Tabs>
        </div>
        {this.getPage()}
      </div>
    );
  }
}

export default Page;
