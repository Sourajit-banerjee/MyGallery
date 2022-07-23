import cookie from "js-cookie";
import { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
//set cookie

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
  });
};

//remove from cookie

export const removeCookie = (key, value) => {
  cookie.remove(key);
};
//get from cookie such as stored token
//will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  return cookie.get(key);
};

//set in localStorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//remove from localStorage
export const removeLocalStorage = (key, value) => {
  localStorage.removeItem(key);
};

//authenticate user by passing data to cookie and local storage during signin
export const authenticate = (res, next) => {
  setCookie("token", res.data.token);
  setLocalStorage("user", res.data.user);
  next();
};

//access user info from localStorage
export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

//logout

export const logout = (history) => {
  removeCookie("token");
  removeLocalStorage("user");
  history.push('/login')

};
