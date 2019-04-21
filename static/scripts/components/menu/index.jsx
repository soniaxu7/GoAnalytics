import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    const {items} = this.props;

    // This is to get current url to identify which dataset should be highlited in menu
    const path = window.location.pathname;

    return (
      <div className="menu">
        <div style={{marginBottom: '12px', marginTop: '8px'}}>
          <Link to="/upload">
            <Button size="sm" variant="outline-success" block={true}>Upload Dataset</Button>
          </Link>
        </div>
        <Nav defaultActiveKey="/home" className="flex-column nav-pills">
          {items.map((item) => {
            // the url of the current dataset
            const currentPath = `/p/${item.name}`;

            // <Link> is from react-router which manages the router
            return (
              <Nav.Item key={item.name}>
                <Link className={'nav-link' + (currentPath == path ? ' active' : '')} to={currentPath} key={item.name}>
                  {item.name}
                </Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    );
  }
}

export default Menu;
