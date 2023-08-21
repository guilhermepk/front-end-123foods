
import jwt_decode from 'jwt-decode';
const isAdmin = () => {
  const storedToken = localStorage.getItem('payload');
  
  if (storedToken) {
    const decodedToken = jwt_decode(storedToken);
    return decodedToken.admin || false;
  }
  
  return false;
};

export default isAdmin;