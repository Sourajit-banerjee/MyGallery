import React from "react";
import "./Card.css";
import axios from "axios";
import { getCookie } from "../helpers/auth";

const Card = (props) => {
  let { uploadDate,pageReload } = props;
  const token = getCookie("token");
  uploadDate = new Date();
  const dateUpload = uploadDate.toDateString();

  console.log(props.slug)

  const deleteImage = async (slug) => {
    try{
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/image-upload/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      pageReload()
      console.log("Image delete:", res);
    }catch(err)
    {
      console.log("Catch error:",err)
    }
    
   
  };
  return (
    <div className="parent">
      <div className="card">
        <img src={props.img} alt="" />
        <div className="card-body">
          <h2>{props.name}</h2>
          <p> <div
      dangerouslySetInnerHTML={{__html: props.content}}
    /></p>
          <h4>{dateUpload}</h4>
          <button
            className="btn btn-outline-danger float-right"
            onClick={()=>deleteImage(props.slug)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
