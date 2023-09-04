import './Userprofile.css';
import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AvatarEditor from 'react-avatar-editor'; // Importe o AvatarEditor

const Userprofile = (props) => {
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = decoded_token?.sub;
    const [showUploadButton, setShowUploadButton] = useState(false);
    const userInfo = useUserinfo(token, userId);
    const [editor, setEditor] = useState(null); // State para o editor

    const handleImageDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
    };

    const handleUploadImage = async () => {
        try {
            if (editor) {
                const canvas = editor.getImage(); // Obtenha a imagem do editor
                const blob = await new Promise((resolve) => {
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    });
                });

                const formData = new FormData();
                formData.append('file', blob);

                await axios.patch(`http://localhost:3000/users/${decoded_token.sub}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSelectedImage(null);
                window.location.reload();
                setShowImageUploadModal(false);
            }
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    const handleImageUploadButtonClick = () => {
        setShowImageUploadModal(true);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);

    return (
        userInfo && (
            <div>
                <div className='user-data'>
                    <div className='name-and-image'>
                        <h2 className="perfil-usuario">Olá, {userInfo.name}!</h2>
                            <Dropzone onDrop={handleImageDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className="user-image-container" onMouseEnter={() => setShowUploadButton(true)} onMouseLeave={() => setShowUploadButton(false)}>
                                        {userInfo.image && (
                                            <img
                                                src={`http://localhost:3000/uploads/${userInfo.image}`}
                                                alt="User Image"
                                                className="imagem-perfil"
                                            />
                                        )}
                                        {!userInfo.image && (
                                            <img
                                                src={`http://localhost:3000/uploads/imagem-padrao.gif`}
                                                alt="Default User Image"
                                                className="imagem-perfil"
                                            />
                                        )}
                                        {showUploadButton && (
                                            <button className="botao-hover" onClick={handleImageUploadButtonClick}>
                                                Atualizar Imagem
                                            </button>
                                        )}
                                        <input {...getInputProps()} />
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    <div className="conta-usuario">
                        <label className="label-dados">Nome:</label>
                        <input className="dados-pessoais" type="text" value={userInfo.name} disabled />
                        <label className="label-dados">Email:</label>
                        <input className="dados-pessoais" type="text" value={userInfo.email} disabled />
                        <label className="label-dados">Telefone:</label>
                        <input className="dados-pessoais" type="text" value={userInfo.phone} disabled />
                        <label className="label-dados">CPF:</label>
                        <input className="dados-pessoais" type="text" value={userInfo.cpf} disabled />
                    </div> 
                
                {showImageUploadModal && (
                    <div className="image-upload-modal">
                        <div className="image-upload-modal-content">
                            <span className="close-image" onClick={() => setShowImageUploadModal(false)}>
                                &times;
                            </span>
                            <h2 className="atualizar-imagem">Atualizar Imagem do Usuário</h2>
                            <p className="selecionar-imagem">Selecionar imagem:</p>
                            <form className="form-imagem" >
                                <div className="campo-selecionar">
                                    <AvatarEditor
                                            ref={(editorRef) => setEditor(editorRef)} // Use ref para acessar o editor
                                            image={selectedImage} // Sua imagem selecionada
                                            width={300} // Largura do editor (ajuste de acordo com suas necessidades)
                                            height={300} // Altura do editor (ajuste de acordo com suas necessidades)
                                            border={0} // Defina a largura da borda como 0 para remover a borda quadrada
                                            borderRadius={250} // Defina metade da largura/altura para tornar o recorte redondo
                                            color={[255, 255, 255, 0.6]} // Cor de fundo do editor
                                            scale={5}
                                        />
                                    <button className="botao-salvar-margin" type="button" onClick={handleUploadImage}>
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    );
};

export default Userprofile;