
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserinfo = (token, userId) => {
    const [userinfo, setUserInfo] = useState(null);

    useEffect(() => {
        
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setUserInfo(data);
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
                setUserInfo(null);
            }
        };

        if (token && userId) {
            fetchUserInfo();
        }
    }, [token, userId]);

    return userinfo;
};