import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

class Upload extends React.Component {
  render() {
    return (
      <div className="form-upload">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="4"><Form.Control size="sm" type="text"  /></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">Initiative</Form.Label>
            <Col sm="4"><Form.Control plaintext readOnly type="file" /></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">Regulation</Form.Label>
            <Col sm="4"><Form.Control plaintext readOnly type="file" /></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">Society</Form.Label>
            <Col sm="4"><Form.Control plaintext readOnly type="file" /></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="4"><Button size="sm" width="100" variant="success">Upload</Button></Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Upload;
