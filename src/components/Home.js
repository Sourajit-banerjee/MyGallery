import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import axios from "axios";
import { isAuth } from "../helpers/auth";
import { useHistory } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { getCookie } from "../helpers/auth";
import "./Home.css";
import 'react-quill/dist/quill.bubble.css'

const Home = () => {
  const [state, setState] = useState({
    name: "",
    error: "",
    success: "",
    buttonText: "Add Image",
    image: "",
  });

  const [content, setContent] = useState("");

  const [imageLoadButtonName, setImageLoadButtonName] =
    useState("Upload Image");
  const { name, success, image, error, buttonText } = state;

  const history = useHistory();

  //blocking unauthorized access
  if (!isAuth()) {
    history.push("./login");
  }

  //TOKEN
  const token = getCookie("token");

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleContent = (e) => {
    // console.log(e);
    setContent(e);
    setState({ ...state, success: "", error: "" });
  };

  const handleImage = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }

    setImageLoadButtonName(event.target.files[0].name);
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            setState({ ...state, image: uri, success: "", error: "" });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Adding...." });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/image-upload`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("UPLOPAD IMAGE RESPONSE", response);
      setState({
        ...state,
        name: "",
        content: "",
        buttonText: "Added",
        success: `${response.data.name} is created`,
      });
  

      
    } catch (error) {
      console.log("UPLOAD img error:", error);
      setState({
        ...state,
        buttonText: "Add Image",
        error: error.response.data.error,
      });
    }
  };
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1>Upload Images</h1>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <br />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              value={name}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Content</label>

            <ReactQuill
              value={content}
              onChange={handleContent}
              placeholder="Write something short about the picture.... (Note:You can right click on Text to enable Text editor)"
              className="pb-5 mb-3"
              theme="bubble"
              style={{ border: "1px solid #666" }}
            />

          </div>
          <div className="form-group">
            <label className="btn btn-outline-secondary">
              {imageLoadButtonName}
              <div className="inputHidden">
                <input
                  onChange={handleImage}
                  type="file"
                  accept="image/*"
                  className="form-control"
                />
              </div>
            </label>
          </div>
          <div>
            <button className="btn  btn-lg btn-block" id="uploadBtn">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
