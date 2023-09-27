import './Useradress.css';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useUserinfo } from '../Userinfo/Userinfo';
import Addressdelete from './UseraddressDelete';
import InputMask from 'react-input-mask';
import iziToast from 'izitoast';
import AddressField from './AdressField';


const Useraddress = ({ handleregisterAddress }) => {
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [useraddress, setUseraddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const [hasFetchedUserAddress, setHasFetchedUserAddress] = useState(false);

    const [editingAddressIndex, setEditingAddressIndex] = useState(-1);

    const [editedAddress, setEditedAddress] = useState({});
    const [originalAddress, setOriginalAddress] = useState({}); 

    const userInfo = useUserinfo(token, userId);

    const handleEditAddress = (index) => {
        setOriginalAddress(useraddress[index]);
        setEditingAddressIndex(index);
        setEditedAddress({ ...useraddress[index] });
    };

    const handleCancelEdit = () => {
        setEditedAddress({});
        setEditingAddressIndex(-1);
    };

    const handleInputChange = (event, field) => {
        const updatedAddress = { ...editedAddress };
        updatedAddress[field] = event.target.value;
        setEditedAddress(updatedAddress);
    };

    const handleUpdateAddress = async () => {
        try {
           
            const { id, ...addressData } = editedAddress;
    
            await axios.patch(`${process.env.REACT_APP_HOST}/address/${editedAddress.id}`, addressData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUserAddress = [...useraddress];
            updatedUserAddress[editingAddressIndex] = editedAddress;
            setUseraddress(updatedUserAddress);
            setEditingAddressIndex(-1);
            setEditedAddress({});
        } catch (error) {
            console.error('Erro ao atualizar o endereço:', error);
        }
    };

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
            const response = await axios.get(`${process.env.REACT_APP_HOST}/address/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setUseraddress(data);
        } catch (error) {
            console.error('Erro ao buscar os dados do usuário:', error);
            setUseraddress(null);
        }
    };

    const handleEditCEPBlur = async () => {
        const cep = editedAddress.cep.replace(/\D/g, ''); // Remova caracteres não numéricos
        if (cep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
              throw new Error('CEP inválido');
            }
      
           
            setEditedAddress((prevEditedAddress) => ({
              ...prevEditedAddress,
              state: data.uf,
              city: data.localidade,
              street: data.logradouro,
              district: data.bairro,
            }));
          } catch (error) {
            console.error(error);
            iziToast.error({
              title: 'Erro',
              message: 'CEP inválido',
            });
          }
        }
      }
    return (
        <div className='modal-total'>
            {userId !== null && (
                <div>
                {useraddress && useraddress.length === 1 && (
                    <div className="endereco-um">
                        <div className="endereco-container" key={useraddress[0].id}>
                            <h3 className="titulo-endereco-um">Endereço 1</h3>
                                {editingAddressIndex === 0 ? (
                                <>
                                    <AddressField
                                        label="Cidade"
                                        value={editedAddress.city}
                                        onChange={handleInputChange}
                                    />
                                    <AddressField
                                        label="Rua"
                                        value={editedAddress.street}
                                        onChange={handleInputChange}
                                    />
                                    <AddressField
                                        label="Estado"
                                        value={editedAddress.state}
                                        onChange={handleInputChange}
                                    />
                                    <AddressField
                                        label="CEP"
                                        value={editedAddress.cep}
                                        onChange={handleInputChange}
                                        onBlur={handleEditCEPBlur}
                                    />
                                    <AddressField
                                        label="Bairro"
                                        value={editedAddress.district}
                                        onChange={handleInputChange}
                                    />
                                    <AddressField
                                        label="Número"
                                        value={editedAddress.numberhouse}
                                        onChange={handleInputChange}
                                    />
                                    <AddressField
                                        label="Complemento"
                                        value={editedAddress.complement}
                                        onChange={handleInputChange}
                                    />
                                    <div>
                                        <button
                                            className="button-save-new-adress"
                                            onClick={handleUpdateAddress}
                                        > Salvar
                                        </button>
                                        <button
                                            className="button-cancel-new-adress"
                                            onClick={handleCancelEdit}
                                        > Cancelar
                                        </button>
                                    </div>
                                </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="label-endereco">
                                                Cidade:
                                            </label>
                                            <input
                                                className="dados-endereco-um cidade"
                                                type='text'
                                                value={useraddress[0].city}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                Rua:
                                            </label>
                                            <input
                                                className="dados-endereco-um rua"
                                                type='text'
                                                value={useraddress[0].street}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                Estado:
                                            </label>
                                            <input
                                                className="dados-endereco-um estado"
                                                type='text'
                                                value={useraddress[0].state}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                CEP:
                                            </label>
                                            <input
                                                className="dados-endereco-um cep"
                                                type='text'
                                                value={useraddress[0].cep}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                Bairro:
                                            </label>
                                            <input
                                                className="dados-endereco-um bairro"
                                                type='text'
                                                value={useraddress[0].district}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                Número:
                                            </label>
                                            <input
                                                className="dados-endereco-um numero"
                                                type='text'
                                                value={useraddress[0].numberhouse}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="label-endereco">
                                                Complemento:
                                            </label>
                                            <input
                                                className="dados-endereco-um complemento"
                                                type='text'
                                                value={useraddress[0].complement}
                                                disabled
                                            />
                                        </div>
                                        <div className='botao-excluir-div'>
                                            <button className="botao-excluir" onClick={() => Addressdelete(useraddress[0].id)}>
                                                Excluir
                                            </button>
                                            <a
                                                className='adress-alter'
                                                onClick={() => handleEditAddress(0)}
                                            >
                                                Alterar endereço
                                            </a>
                                        </div>
                                    </>
                                )}
                        </div>
                            <div className='botao-adicionar-div'>
                                <IoIosAddCircleOutline className='icon-add' onClick={handleregisterAddress} size={40} />
                                <button className="botao-adicionar" onClick={handleregisterAddress}>Adicionar Endereço</button>
                            </div>
                    </div>
                    )}
                    {useraddress && useraddress.length > 1 && (
                        useraddress.map((address, index) => (
                            <div className="endereco-dois" key={address.id}>
                                <div>
                                    <h3 className="titulo-endereco">Endereço {index + 1}</h3>
                                    {editingAddressIndex === index ? (
                                        <>
                                            <AddressField
                                                label="Cidade"
                                                value={editedAddress.city}
                                                onChange={handleInputChange}
                                            />
                                            <AddressField
                                                label="Rua"
                                                value={editedAddress.street}
                                                onChange={handleInputChange}
                                            />
                                            <AddressField
                                                label="Estado"
                                                value={editedAddress.state}
                                                onChange={handleInputChange}
                                            />
                                            <AddressField
                                                label="CEP"
                                                value={editedAddress.cep}
                                                onChange={handleInputChange}
                                                onBlur={handleEditCEPBlur}
                                            />
                                            <AddressField
                                                label="Bairro"
                                                value={editedAddress.district}
                                                onChange={handleInputChange}
                                            />
                                            <AddressField
                                                label="Número"
                                                value={editedAddress.numberhouse}
                                                onChange={handleInputChange}
                                            />
                                            <AddressField
                                                label="Complemento"
                                                value={editedAddress.complement}
                                                onChange={handleInputChange}
                                            />
                                            <div>
                                                <button
                                                    className="button-save-new-adress"
                                                    onClick={handleUpdateAddress}
                                                > Salvar
                                                </button>
                                                <button
                                                    className="button-cancel-new-adress"
                                                    onClick={handleCancelEdit}
                                                > Cancelar
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label className='label-endereco'>
                                                    Cidade:
                                                </label>
                                                <input
                                                    className='dados-endereco cidade'
                                                    type='text'
                                                    value={address.city}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    Rua:
                                                </label>
                                                <input
                                                    className="dados-endereco rua"
                                                    type='text'
                                                    value={address.street}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    Estado:
                                                </label>
                                                <input
                                                    className="dados-endereco estado"
                                                    type='text'
                                                    value={address.state}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    CEP:
                                                </label>
                                                <input
                                                    className="dados-endereco cep"
                                                    type='text'
                                                    value={address.cep}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    Bairro:
                                                </label>
                                                <input
                                                    className="dados-endereco bairro"
                                                    type='text'
                                                    value={address.district}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    Número:
                                                </label>
                                                <input
                                                    className="dados-endereco numero"
                                                    type='text'
                                                    value={address.numberhouse}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <label className="label-endereco">
                                                    Complemento:
                                                </label>
                                                <input
                                                    className="dados-endereco complemento"
                                                    type='text'
                                                    value={address.complement}
                                                    disabled
                                                />
                                            </div>
                                            <div className='botao-excluir-div'>
                                                <button className="botao-excluir" onClick={() => Addressdelete(address.id)}>
                                                    Excluir
                                                </button>
                                                <a
                                                    className='adress-alter'
                                                    onClick={() => handleEditAddress(index)}
                                                >
                                                    Alterar endereço
                                                </a>
                                            </div>
                                        </>
                                    )}
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
    );
}

export default Useraddress;
