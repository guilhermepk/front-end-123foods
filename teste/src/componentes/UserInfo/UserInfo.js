
import axios from 'axios';
import jwt_decode from 'jwt-decode';
    export const fetchUpdatedUserInfo = async (token, decodedToken) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${decodedToken.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        return null;
      }
    };