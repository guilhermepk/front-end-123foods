import './Userprofile.css';
import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Avatar from 'react-avatar-edit';

const Userprofile = (props) => {

    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [showUploadButton,setShowUploadButton] = useState(null);
    const [showImageUploadModal,setShowImageUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = decoded_token?.sub; 
    const userInfo=useUserinfo(token,userId);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showAvatarModal, setShowAvatarModal] = useState(false);

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

    const onAvatarCrop = (preview) => {
        setAvatarPreview(preview);
    }

    const onCloseAvatarModal = () => {
        setShowAvatarModal(false);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);

    return(
        userInfo && (
            <div>
                <div className='user-data'>
                    <div className='name-and-image'>
                        <h2 className="perfil-usuario"> Olá, {userInfo.name}! </h2>
                        <div className="user-image-container" onMouseEnter={() => setShowUploadButton(true)} onMouseLeave={() => setShowUploadButton(false)}>
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="User Image" className="imagem-perfil" />
                            ) : userInfo.image ? (
                                <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" className="imagem-perfil" />
                            ) : (
                                <img src={`http://localhost:3000/uploads/imagem-padrao.gif`} alt="Default User Image" className="imagem-perfil"/>
                            )}
                            {showUploadButton && (
                                <button className="botao-hover" onClick={() => setShowImageUploadModal(true)}>Atualizar Imagem</button>
                            )}
                        </div>
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
                </div>

                {showImageUploadModal &&  (
                    <div  className="image-upload-modal">
                        <div  className="image-upload-modal-content">
                            <span className="close-image" onClick={() => setShowImageUploadModal(false)}>
                                &times;
                            </span>
                                <h2 className="atualizar-imagem">Atualizar Imagem do Usuário</h2>
                                <p className="selecionar-imagem">Selecionar imagem:</p>
                                <form className="form-imagem">
                                    <div className="campo-selecionar">
                                        <Avatar 
                                            label={"Escolha uma imagem"}
                                            width={350}
                                            height={200}
                                            onCrop={onAvatarCrop}
                                            onClose={onCloseAvatarModal}
                                        />
                                        {selectedImage && (
                                            <div className="mudar-imagem-margin">
                                                <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" className="mudar-imagem-perfil"/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="botao-salvar-margin">
                                    <button  className="botao-salvar" onClick={handleUploadImage} type="submit">Salvar</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                )}
                {/* {showAvatarModal && (
                    <div className="avatar-modal">
                        <div className="avatar-modal-content">
                            <span className="close-avatar" onClick={onCloseAvatarModal}>&times;</span>
                            <h2 className="atualizar-imagem">Atualizar Avatar</h2>
                            
                            <button className="botao-salvar" onSubmit={handleUploadImage}>Salvar</button>
                        </div>
                    </div>
                )} */}
            </div>
        )
    );
};

export default Userprofile;

