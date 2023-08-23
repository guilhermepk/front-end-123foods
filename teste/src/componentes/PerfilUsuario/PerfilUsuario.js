import '../Navbar/Navbar.css';
import React, { useState, useEffect } from 'react';
import { useUserInfo } from '../UserInfo/UserInfo';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {BsArrowLeftCircle} from 'react-icons/bs';
import jwt_decode from 'jwt-decode';

const PerfilUsuario = (props) => {

    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [showUploadButton,setShowUploadButton] = useState(null);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);
    console.log('userinfo:', userInfo);



    const handleImageDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
    };


    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            await axios.patch(`http://localhost:3000/users/${decoded_token.sub}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            })
            setSelectedImage(null);
            window.location.reload()
            setShowImageUploadModal(false);
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    const handleImageUploadButtonClick = () => {
        setShowImageUploadModal(true);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);

    // const handleLogout = () => {
    //     console.log('userinfo: ', userInfo)
    //     setToken(null);
    //     setDecodedToken(null);
    //     localStorage.removeItem('payload');
    //     window.location.reload()
    // };

    


    return(
        userInfo && (
               <div>
                    <h2 className="perfil-usuario">
                        Olá, {userInfo.name}!</h2>
                    <div className="user-image-container" onMouseEnter={() => setShowUploadButton(true)} onMouseLeave={() => setShowUploadButton(false)}>
                        {userInfo.image && (
                            <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" className="imagem-perfil" />
                        )}
                        {!userInfo.image && (
                            <img src={`http://localhost:3000/uploads/imagem-padrao.gif`} alt="Default User Image" className="imagem-perfil"/>
                        )}
                        {showUploadButton && (
                            <button className="botao-hover" onClick={handleImageUploadButtonClick}>Atualizar Imagem</button>
                        )}
                    </div>
                    <div className="conta-usuario">
                    <label className="label-dados">
                        Nome:
                    </label>
                    <input
                    className="dados-pessoais" type='text'
                    value={userInfo.name}
                    disabled
                    />
                    <label className="label-dados">
                        Email:
                    </label>
                    <input
                    className="dados-pessoais" type='text'
                    value={userInfo.email}
                    disabled
                    />
                    <label className="label-dados">
                        Telefone:
                    </label>
                    <input
                    className="dados-pessoais" type='text'
                    value={userInfo.phone}
                    disabled
                    />
                    <label className="label-dados">
                        CPF:
                    </label>
                    <input
                    className="dados-pessoais" type='text'
                    value={userInfo.cpf}
                    disabled
                    />
                
                    </div>
                    {showImageUploadModal && (
                        <div  className="image-upload-modal">
                            <div  className="image-upload-modal-content">
                                <span className="close-image" onClick={() => setShowImageUploadModal(false)}>
                                    &times;
                                </span>
                                    <h2 className="atualizar-imagem">Atualizar Imagem do Usuário</h2>
                                    <p className="selecionar-imagem">Selecionar imagem:</p>
                                    <form className="form-imagem" onSubmit={handleUploadImage}>
                                        <Dropzone onDrop={handleImageDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div className="dropzone" {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    {selectedImage && (
                                                        <div>
                                                            <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada"  className='imagem-selecionar'/>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                        <button  className="botao-salvar" type="submit">Salvar</button>
                                    </form>
                            </div>
                        </div>
                    )}
                </div>
        )
    );
};

export default PerfilUsuario;

