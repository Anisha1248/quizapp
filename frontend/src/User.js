import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class User extends Component {
  selected = []
  state = {
    // Initially, no file is selected
    selectedFile: null,
    newUser: {
      photo: "",
    },
    currentFile: undefined,
    progress: 0,
    message: "",

    fileInfos:[],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.newUser.photo);
    const forData = new FormData();

    // Update the formData object
    forData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    let currentFile = this.state.selectedFile[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });
    // Details of the uploaded file
    console.log(':::::::::::::::::: SELECTED FILE',this.state.selectedFile);

    this.setState({
      progress: Math.round((100 * e.loaded) / e.total),
    });

    axios
      .post("http://localhost:4000/users/add/", formData)
      .then((response) => {
        console.log("RESPONSE:", response.data);
        this.setState({
              message:"Success",
            });
            // this.setState({
              // fileInfos: 
              // this.state.fileInfos.push(this.state.selectedFile.name)
            // });
            // this.setState({ ...fileInfos, fileInfos: this.state.selectedFile  })
           
            this.selected.push(this.state.selectedFile.name)
            this.setState({ fileInfos: this.selected})

            console.log("File::::::::::",this.state.fileInfos);
      })
      // .then((res) => {
      //   console.log('fdcgvhjgk',res);
      //   this.setState({
      //     message: res.data.message,
      //   });
      //   this.setState({
      //     fileInfos: this.state.fileInfos.push(this.state.selectedFile.name),
      //   });
      // })
     
      .catch((err) => {
        console.log(err);
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });
    this.setState({
      selectedFiles: undefined,
    });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  handlePhoto = (e) => {
    //  this.setState({...newUser,photo:e.target.files[0]});
    //  setNewUser({...newUser, photo: e.target.files[0]});
    const newState = { ...this.state.newUser, photo: e.target.files[0] };
    this.setState({ newUser: newState });
    this.setState({ selectedFile: e.target.files[0] });
  };
  render() {
    return (
      <div>
        {this.state.currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={this.state.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: this.state.progress + "%" }}
            >
              {this.state.progress}%
            </div>
          </div>
        )}

        {/* INPUT FORM */}
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          {/* CHOOSE FILE BTN */}
          <label className="btn btn-default">
            <input
              type="file"
              accept=".csv,.xlsx"
              name="photo"
              onChange={this.handlePhoto}
            />
          </label>

          {/* SUBMIT FILE UPLOAD */}
          <input type="submit" />
          <div className="alert alert-light" role="alert">
            {this.state.message}
          </div>

          {/* LIST OF FILES */}
          {this.state.fileInfos !== undefined && this.state.fileInfos !== [] ?
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {this.state.fileInfos.map((file, index) => (
                  <li className="list-group-item" key={index}>
                    {console.log(' []][]][[][', file)}
                    <p href="#">{file}</p>
                  </li>
                ))}
            </ul>
          </div> : null}
        </form>
      </div>
    );
  }
}
