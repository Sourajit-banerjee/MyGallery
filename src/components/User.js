import axios from "axios";
import "./Card.css";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getCookie } from "../helpers/auth";
import { isAuth } from "../helpers/auth";

import Card from "./Card";
const User = () => {
  const [userDataState, setUserDataState] = useState({
    userData: "",
    error: "",
  });
  const history = useHistory();

  if (!isAuth()) {
    history.push("/login");
  }
  const token = getCookie("token");

  console.log(userDataState);

  const { userData } = userDataState;
  //   console.log(userData[1].image.url);
  // if(userData)
  // {
  //     const listCatergories=()=>  userData.map((c,i)=>{ <div style={{border:'1px solid red'}}> <img src={c.image.url}></img> </div>})
  // }


 const pageReload=()=>{
    window.location.reload()
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/image-upload-list`,
        {
          token,
        }
      );
      setUserDataState({
        ...userDataState,
        userData: response.data,
        error: "",
      });

      return response.data;
    };
    try {
      fetchData();
    } catch (error) {
      if (error.response.status === 401) {
        return { user: "no user" };
      }
    }
  }, []);

  return (
    <>
      <div className="col-md-6 offset-md-3 pb-0">
        <h1 className="text-center font-weight-bold font-italic display-3">My Gallery</h1>
      </div>

      {/* {() => {
            console.log("From jsx",userData)
           return( userData.map((c, i) => {
              return (
                <div style={{ border: "1px solid red" }}>
                  <img src={c.image.url}></img>
                </div>
              );
            })
          )}} */}
      <div className="cards">
        {userData
          ? userData.map((c, i) => {
              return (
                <Card
                  img={c.image.url}
                  name={c.name}
                  content={c.content}
                  uploadDate={c.createdAt}
                  slug={c.slug}
                  pageReload={pageReload}
                />
              );
            })
          :<h2 >No images to show....</h2>}
      </div>
    </>
  );
};

export default User;
