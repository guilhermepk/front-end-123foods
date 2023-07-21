const isAdmin = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo).admin : false;
};


export default isAdmin;