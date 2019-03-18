import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import request from '../../../request';

class Upload extends React.Component {
  upload_dataset() {
    // const name = document.getElementById('dataset-name').value;
    // const initiative = document.getElementById('dataset-initiative').files[0];
    // const regulation = document.getElementById('dataset-regulation').files[0];
    // const society = document.getElementById('dataset-society').files[0];

    // const data = {
      // name,
      // initiative,
    // }

    request.upload_dataset();
  }

  render() {
    return (
      <div className="form-upload">
        <Form id="form-upload" encType="multipart/form-data">
          <Form.Group as={Row}>
            <Form.Label column sm="2">Name</Form.Label>
            <Col sm="4"><Form.Control name="name" size="sm" type="text" id="dataset-name" /></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Initiative</Form.Label>
            <Col sm="4"><Form.Control name="initiative" plaintext readOnly type="file" id="dataset-initiative" /></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Regulation</Form.Label>
            <Col sm="4"><Form.Control name="regulation" plaintext readOnly type="file" id="dataset-regulation" /></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Society</Form.Label>
            <Col sm="4"><Form.Control name="society" plaintext readOnly type="file" id="dataset-society" /></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2"></Form.Label>
            <Col sm="4">
              <Button size="sm" width="100" variant="success" onClick={this.upload_dataset}>Upload</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Upload;
