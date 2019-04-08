import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import request from '../../../request';

import { connect } from 'react-redux'
import { addDataset } from '../../actions'

class Upload extends React.Component {
  constructor(props) {
    super(props)

    this.upload_dataset = this.upload_dataset.bind(this);
    // this.onChangeFileName = this.onChangeFileName.bind(this);
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

  onChangeFileName(name, e) {
    let filename = e.target.files[0].name;
    let input = document.getElementById(name + '-filename');
    input.value = filename;

    console.log()
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
            <Col sm="4">
                <div className="custom-file">
                  <input type="text" id="initiative-filename"
                    className="custom-file-input custom-file-input-name" />
                  <input name="initiative"
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onChangeFileName.bind(this, 'initiative')} />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Regulation</Form.Label>
            <Col sm="4">
                <div className="custom-file">
                  <input type="text" id="regulation-filename"
                    className="custom-file-input custom-file-input-name" />
                  <input name="regulation" type="file" className="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon02"
                    onChange={this.onChangeFileName.bind(this, 'regulation')} />
                  <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Society</Form.Label>
            <Col sm="4">
                <div className="custom-file">
                  <input type="text" id="society-filename"
                    className="custom-file-input custom-file-input-name" />
                  <input name="society" type="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03"
                    onChange={this.onChangeFileName.bind(this, 'society')} />
                  <label className="custom-file-label" htmlFor="inputGroupFile03">Choose file</label>
                </div>
            </Col>
          </Form.Group>

          {//<Form.Group as={Row}>
          //   <Form.Label column sm="2">Initiative</Form.Label>
          //   <Col sm="4"><Form.Control name="initiative" plaintext readOnly type="file" id="dataset-initiative" /></Col>
          // </Form.Group>
          // <Form.Group as={Row}>
          //   <Form.Label column sm="2">Regulation</Form.Label>
          //   <Col sm="4"><Form.Control name="regulation" plaintext readOnly type="file" id="dataset-regulation" /></Col>
          // </Form.Group>
          // <Form.Group as={Row}>
          //   <Form.Label column sm="2">Society</Form.Label>
          //   <Col sm="4"><Form.Control name="society" plaintext readOnly type="file" id="dataset-society" /></Col>
          // </Form.Group>
          //
        }
          
          <Form.Group as={Row} style={{marginTop: '12px'}} >
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
