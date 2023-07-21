import React from "react";
import { Navigate, Route } from "react-router-dom";

const isAdmin = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo).admin : false;
};


export default isAdmin;