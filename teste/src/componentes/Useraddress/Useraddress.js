import './Useradress.css'
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useUserinfo } from '../Userinfo/Userinfo';
import Addressdelete from './UseraddressDelete';

const Useraddress = ({handleregisterAddress}) => {
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [useraddress, setUseraddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const [hasFetchedUserAddress, setHasFetchedUserAddress] = useState(false); 

    const userInfo = useUserinfo(token, userId);

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
<div className='modal-total'>
        {userId !== null && (
            <div>
                {useraddress && useraddress.length === 1 && (
                    <div className="endereco-um">    
                        <div className="endereco-container" key={useraddress[0].id}>
                            <h3 className="titulo-endereco-um">Endereço 1</h3>
                                <div>
                                    <label className="label-endereco">
                                        Cidade:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].city}
                                    disabled
                                    />
                                </div>
                                    <div>
                                    <label className="label-endereco">
                                        Rua:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].street}
                                    disabled
                                    />
                                </div>
                                    <div>
                                    <label className="label-endereco">
                                        Estado:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].state}
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className="label-endereco">
                                        CEP:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].cep}
                                    disabled
                                    />
                                </div>
                                    <div>
                                    <label className="label-endereco">
                                        Bairro:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].district}
                                    disabled
                                    />
                                </div>
                                    <div>
                                    <label className="label-endereco">
                                        Complemento:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].complement}
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className="label-endereco">
                                        Número:
                                    </label>
                                    <input
                                    className="dados-endereco-um" type='text'
                                    value={useraddress[0].numberhouse}
                                    disabled
                                    />
                                </div>
                            <div className='botao-excluir-div'>       
                                <button className="botao-excluir" onClick={() => Addressdelete(useraddress[0].id)}>
                                    Excluir
                                </button>
                                <a className='adress-alter' href='/adress-alter' target='_blank'> Alterar endereço</a>
                            </div>    
                        </div>
                            <div className='botao-adicionar-div'>
                                <IoIosAddCircleOutline className='icon-add' onClick={handleregisterAddress} size={40} />       
                                <button className="botao-adicionar" onClick={handleregisterAddress}>Adicionar Endereço</button>
                            </div>
                    </div>    
                )}

                {useraddress && useraddress.length > 1 && (
                    useraddress.map((address, index) => (
                        <div className="endereco-dois">
                            <div endereco-container key={address.id}>
                                <h3 className="titulo-endereco">Endereço {index + 1}</h3>
                                <div>
                                    <label className='label-endereco'>
                                        Cidade:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.city} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Rua:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.street} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Estado:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.state} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Cep:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.cep} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Bairro:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.district} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Complemento:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.complement} 
                                    disabled
                                    />
                                </div>
                                <div>
                                    <label className='label-endereco'>
                                        Número:
                                    </label> 
                                    <input className='dados-endereco' 
                                    type='text' 
                                    value={address.numberhouse} 
                                    disabled
                                    />
                                </div>
                            </div>
                            <div className='botao-excluir-div'>       
                                <button className="botao-excluir" onClick={() => Addressdelete(address.id)}>
                                    Excluir
                                </button>
                                <a className='adress-alter' href='/adress-alter' target='_blank'> Alterar endereço</a>
                            </div>
                        </div>    
                    ))
                )}

                {(!useraddress || useraddress.length <= 0) && (
                    <div>
                    <div className='add-endereco-um'>
                        <IoIosAddCircleOutline className='icon-add-um' onClick={handleregisterAddress} size={40} />
                        <button className='botao-add-endereco-um' onClick={handleregisterAddress} >Adicionar Endereço</button>
                    </div>
                    <div className='add-endereco-dois'>
                        <IoIosAddCircleOutline className='icon-add-dois' onClick={handleregisterAddress} size={40} />
                        <button className='botao-add-endereco-dois' onClick={handleregisterAddress} >Adicionar Endereço</button>
                    </div>
                    </div>
                )}
            </div>
        )}
    </div>

    )
}
export default Useraddress;