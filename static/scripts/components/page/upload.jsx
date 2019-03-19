import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import request from '../../../request';

import { connect } from 'react-redux'
import { addDataset } from '../../actions'

class Upload extends React.Component {
  constructor(props) {
    super(props)

    this.upload_dataset = this.upload_dataset.bind(this);
  }

  upload_dataset() {
    var form = document.getElementById('form-upload');
    var formData = new FormData(form);

    request.upload_dataset(formData).then((res) => {

      const name = document.getElementById('dataset-name').value;
      this.props.dispatch(addDataset({ name }));

      // React-router redirect
      this.props.history.push('/p/' + name);
    });
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

export default connect()(Upload)
