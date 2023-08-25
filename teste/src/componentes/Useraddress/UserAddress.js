import './UserAdress.css'
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useUserInfo } from '../UserInfo/UserInfo';

const UserAddress = ({handleregisterAddress}) => {
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [useraddress, setUseraddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const [hasFetchedUserAddress, setHasFetchedUserAddress] = useState(false); 

    const userInfo = useUserInfo(token, userId);

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
            setUserId(decodedToken.sub);
        }
    }, []);

    useEffect(() => {
        if (userId && !hasFetchedUserAddress) {
            fetchUseraddress();
            setHasFetchedUserAddress(true); 
        }
    }, [userId, hasFetchedUserAddress]); 

    const fetchUseraddress = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/address/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setUseraddress(data);
            console.log('useraddress:', data);
        } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
            setUseraddress(null);
        }
    };

    return(
<div>
        {userId !== null && (
            <div>
                {useraddress && useraddress.length === 1 && (
                    <div className="endereco-um">    
                        <h3 className="titulo-endereco">Endereço 1</h3>
                        <div className="endereco-container" key={useraddress[0].id}>
                            <div>
                            <label className="label-endereco">
                                Cidade:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].city}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                Rua:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].street}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                Estado:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].state}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                CEP:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].cep}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                Bairro:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].district}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                Complemento:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].complement}
                            disabled
                            />
                            </div>
                            <div>
                            <label className="label-endereco">
                                Número:
                            </label>
                            <input
                            className="dados-endereco" type='text'
                            value={useraddress[0].numberhouse}
                            disabled
                            />
                            </div>
                        </div>       
                        <button className="botao-adicionar" onClick={handleregisterAddress}>Adicionar Endereço</button>
                    </div>    
                )}

                {useraddress && useraddress.length > 1 && (
                    useraddress.map((address, index) => (
                        <div className="endereco-dois">
                            <div key={address.id}>
                                <h3>Endereço {index + 1}</h3>
                                <p>Cidade: {address.city}</p>
                                <p>Rua: {address.street}</p>
                                <p>Estado: {address.state}</p>
                                <p>Cep: {address.cep}</p>
                                <p>Bairro: {address.district}</p>
                                <p>Complemento: {address.complement}</p>
                                <p>Número: {address.numberhouse}</p>
                            </div>
                        </div>    
                    ))
                )}

                {(!useraddress || useraddress.length <= 0) && (
                    <div>
                    <div>
                        <button onClick={handleregisterAddress}>Adicionar Endereço</button>
                    </div>
                    <div>
                        <button onClick={handleregisterAddress}>Adicionar Endereço</button>
                    </div>
                    </div>
                )}
            </div>
        )}
    </div>

    )
}
export default UserAddress;