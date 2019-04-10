import React from 'react';
import { ToggleButtonGroup, ToggleButton, 
  ButtonToolbar, Button, Container, Row, Col, Table } from 'react-bootstrap';
import request from '../../../request';
import * as d3 from 'd3';

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      initiative: [],
      selected_initiative: [],
      regulation: [],
      selected_regulation: [],
      society: [],
      selected_society: [],
    };

    this.getColumnNames = this.getColumnNames.bind(this);
    this.handleInitiative = this.handleInitiative.bind(this);
    this.handleRegulation = this.handleRegulation.bind(this);
    this.handleSociety = this.handleSociety.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getColumnNames();
  }

  componentDidMount() {
    this.getColumnNames();
    this.drawChart();
  }

  drawChart() {
    /* 
      bar chart tutorial
      https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
      https://www.dashingd3js.com/svg-paths-and-d3js

      with hover data
      http://bl.ocks.org/eric-bunch/0bdef4942ac085a93fa6bd31452cd55c
    */

    // const svg = d3.select('#chart');
    const boxWidth = 800,
      boxHeight = 400;
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
      , width = boxWidth - margin.left - margin.right // Use the window's width 
      , height = boxHeight - margin.top - margin.bottom; // Use the window's height

    // The number of datapoints
    var n = 4;

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        // .curve(d3.curveMonotoneX);
         // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset1 = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
    var dataset2 = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

    const dataset = [{
      values: dataset1,
      color: 'red',
      id: 'id1'
    }, {
      values: dataset2,
      color: 'blue',
      id: 'id2'
    }];

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select('#chart')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

    dataset.forEach((data) => {

      var city = g.selectAll(".city")
        .data(data)
        .enter().append("g")
          .attr("class", "city");

      city.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return z(d.id); });

      city.append("text")
          .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.x)) + "," + y(d.value.y) + ")"; })
          .attr("x", 3)
          .attr("dy", "0.35em")
          .style("font", "10px sans-serif")
          .text(function(d) { return d.id; });
        });

      console.log(dataset)

    // // 3. Call the x axis in a group tag
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // // 4. Call the y axis in a group tag
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // // 9. Append the path, bind the data, and call the line generator 
    // svg.append("path")
    //     .datum(dataset) // 10. Binds data to the line 
    //     .attr("class", "line") // Assign a class for styling
    //     .style("stroke", 'red') // color of line
    //     .attr("d", line); // 11. Calls the line generator 


    // 12. Appends a circle for each datapoint 
    // svg.selectAll(".dot")
    //     .data(dataset)
    //     .enter().append("circle") // Uses the enter().append() method
    //     .attr("class", "dot") // Assign a class for styling
    //     .attr("cx", function(d, i) { return xScale(i) })
    //     .attr("cy", function(d) { return yScale(d.y) })
    //     .attr("r", 5)
    //     .on("mouseover", function(a, b, c) { 
    //         console.log(a) 
    //         // this.attr('class', 'focus')
    //     })
    //     .style("stroke", 'red') // color of line
    //     .style("fill", 'red') // color of line
    //     .on("mouseout", function() {  })    // 12. Appends a circle for each datapoint 
    
    // svg.append("path")
    //     .datum(dataset2) // 10. Binds data to the line 
    //     .attr("class", "line") // Assign a class for styling 
    //     .style("stroke", 'blue') // color of line
    //     .attr("d", line); // 11. Calls the line generator 

    // svg.selectAll(".dot")
    //     .data(dataset2)
    //     .enter().append("circle") // Uses the enter().append() method
    //     .attr("class", "dot") // Assign a class for styling
    //     .attr("cx", function(d, i) { return xScale(i) })
    //     .attr("cy", function(d) { return yScale(d.y) })
    //     .attr("r", 5)
    //     .on("mouseover", function(a, b, c) { 
    //         console.log(a) 
    //         // this.attr('class', 'focus')
    //     })
    //     .style("stroke", 'blue') // color of line
    //     .style("fill", 'blue') // color of line
    //     .on("mouseout", function() {  })

      // svg.append("text")
      //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      //     .attr("transform", function(d) { return "translate(" + x(parseTime(d.value.x)) + "," + y(d.value.y) + ")"; })
      //     .attr("x", 3)
      //     .attr("dy", "0.35em")
      //     .style("font", "10px sans-serif")
      //     .text(function(d) { return d.id; });

  }

  getColumnNames() {
    request.getColumnNames('Hello_world').then((res) => {
      this.setState({
        name: res.name,
        initiative: res.initiative_columns,
        regulation: res.regulation_columns,
        society: res.society_columns
      });
    });
  }

  handleInitiative(value, event) {
    this.setState({
      selected_initiative: value,
    });
  }

  handleRegulation(value, event) {
    this.setState({
      selected_regulation: value,
    });
  }

  handleSociety(value, event) {
    this.setState({
      selected_society: value,
    });
  }

  render() {
    const {initiative, regulation, society} = this.state;

    return (
      <div>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Initiative:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_initiative}
              onChange={this.handleInitiative}
            >
              {initiative.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Regulation:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_regulation}
              onChange={this.handleRegulation}
            >
              {regulation.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row style={{marginBottom: '6px'}}>
          <Col sm="1">Society:</Col>
          <Col sm="10">
            <ToggleButtonGroup
              type="checkbox"
              value={this.state.selected_society}
              onChange={this.handleSociety}
            >
              {society.map((item) => 
                <ToggleButton variant="outline-dark" size="sm" value={item} key={item}>{item}</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <div>
          <Button size="sm">Confirm</Button>
        </div>
        <div>
          <svg id="chart" />
        </div>
      </div>
    );
  }
}

export default Trend;
