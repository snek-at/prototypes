//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//#endregion

//#region > Components
class ImgurPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientID: "7262ac02b1bbf10",
      image: "",
      deletehash: "",
    };
  }

  uploadImage = (event) => {
    const uploadUrl = "https://api.imgur.com/3/image";
    const headers = { Authorization: `Client-ID ${this.state.clientID}` };
    const formData = new FormData();

    formData.append("image", event.target.files[0]);

    fetch(uploadUrl, {
      method: "POST",
      headers: headers,
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          image: result.data.link,
          deletehash: result.data.deletehash,
        });
      });
  };

  deleteImage = () => {
    const deleteUrl = `https://api.imgur.com/3/image/${this.state.deletehash}`;
    const headers = { Authorization: `Client-ID ${this.state.clientID}` };

    fetch(deleteUrl, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          this.setState({ image: "", deletehash: "" });
        }
      });
  };

  render() {
    return (
      <div>
        <form>
          <img src={this.state.image}></img>
          <input type="file" name="file" onChange={this.uploadImage} />
        </form>
        {this.state.deletehash !== "" && (
          <button onClick={this.deleteImage}>Delete Image</button>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Exports
//> Default Component
export default ImgurPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
