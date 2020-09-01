//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Contains the functionality for uploading a file
import Dropzone from "react-dropzone";
import AvatarEditor from 'react-avatar-editor'

import {
  MDBModal,
  MDBModalHeader,
  MDBIcon,
  MDBModalBody,
  MDBProgress,
  MDBBtn,
  MDBModalFooter,
  MDBRangeInput,
  MDBCol,
  MDBRow,
} from "mdbreact";

//> CSS
import "./profile.scss";

class ProfileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
    };
    this.handleWheel = this.handleWheel.bind(this);
  }

  onClickSave = () => {
    if (this.editor) {
      const file = this.editor.getImageScaledToCanvas().toDataURL();

      this.props.setAvatarUrl(file);
      this.props.closeModalProfile();
    }
  }
  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
  }

  handleWheel(event) {
    let scale = this.state.scale;

    if (event.deltaY < 0){
      if (scale < 2) {
        scale += 0.01;
      }
    } 
    else{
      if (scale > 1) {
        scale -= 0.01;
      }
    }

    this.setState({ scale });
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)

    this.setState({ scale })
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <MDBModal
        modalStyle="white"
        className="text-dark"
        size="md"
        id="profile"
        backdrop={true}
        isOpen={true}
        toggle={this.props.closeModalProfile}
      >
        <MDBModalHeader
          className="text-center text-dark"
          titleClass="w-100"
          tag="p"
        >
          <MDBRow id="header">
            <MDBCol md="2" className="text-center">
              <MDBIcon
                icon="arrow-left"
                className="green-text"
                size="1x"
                onClick={this.props.closeModalProfile}
              />
            </MDBCol>
            <MDBCol md="7" className="text-center">Image Editor</MDBCol>
            <MDBCol md="3">
              <MDBBtn 
                color="green" 
                size="sm"
                id="btn-save"
                onClick={this.onClickSave}
                >
                  Save
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.file}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={parseFloat(this.state.scale)}
          />
          <input
            name="scale"
            type="range"
            onChange={this.handleScale}
            min="1"
            max="2"
            step="0.01"
            value={this.state.scale}
          />
        </MDBModalBody>
      </MDBModal>
    );
  }
}

export default ProfileUpload;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
