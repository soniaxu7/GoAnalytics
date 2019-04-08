import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Menu extends React.Component {
  render() {
    const {items} = this.props;

    return (
      <div className="menu">
        <Link to="/viz">
          <Button size="sm">Visualization</Button>
        </Link>
        <Link to="/upload">
          <Button size="sm">Upload Dataset</Button>
        </Link>
        <Nav defaultActiveKey="/home" className="flex-column">
          {items.map((item) => (
            <Link className="nav-link" to={`/p/${item.name}`} key={item.name}>
              {item.name}
            </Link>
          ))}
        </Nav>
      </div>
    );
  }
}

export default Menu;
