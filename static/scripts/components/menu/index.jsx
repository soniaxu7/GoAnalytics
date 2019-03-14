import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Menu extends React.Component {
  render() {
    const {items} = this.props;

    return (
      <div className="menu">
        <Link to="/upload">
          <Button size="sm" onClick={this.onUpload}>Upload Dataset</Button>
        </Link>
        <Nav defaultActiveKey="/home" className="flex-column">
          {items.map((item) => (
            <Link to="/p" key={{item}}>
              <Nav.Link>{item}</Nav.Link>
            </Link>
          ))}
        </Nav>
      </div>
    );
  }
}

export default Menu;
