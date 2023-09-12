import './Userprofile.css';
import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AvatarEditor from 'react-avatar-editor'; 
import { Slider } from '@mui/material';


const Userprofile = (props) => {
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = decoded_token?.sub;
    const [showUploadButton, setShowUploadButton] = useState(false);
    const userInfo = useUserinfo(token, userId);
    const [editor, setEditor] = useState(null); 
    const [zoom, setZoom] = useState(1);
const[zoomLevel,setZoomLevel]=useState(1);
  const [canceledImage, setCanceledImage] = useState(false);

    const handleImageDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
        setCanceledImage(false);
      };
    
      const handleZoomChange = (event,value) => {
        setZoomLevel(value);
    };
    
      const handleCancelImage = () => {
        setSelectedImage(null);
        setCanceledImage(true);
      };

    const handleUploadImage = async () => {
        try {
            if (editor) {
                const canvas = editor.getImage();
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
            <div className="form-imagem">
              {selectedImage && !canceledImage ? (
                <>
                  <AvatarEditor
                    ref={(editorRef) => setEditor(editorRef)}
                    image={selectedImage}
                    width={300}
                    height={300}
                    border={0}
                    borderRadius={250}
                    scale={zoomLevel}
                  />
                  <div className="zoom-slider">
                        <Slider
                            className='slider'
                            value={zoomLevel}
                            min={1}
                            max={3} 
                            sx={{
                                  width: 300,
                                  '& .MuiSlider-thumb': {
                                    borderRadius: '1px',
                                  },
                                }}
                            step={0.1} 
                            onChange={handleZoomChange}
                        />
                    </div>
                    <div className='botao-salvar-margin'></div>
                    <button className="botao-cancelar" type="button" onClick={handleCancelImage}>
                    Cancelar
                  </button>
                  <button className="botao-salvar" type="button" onClick={handleUploadImage}>
                    Salvar
                  </button>
                  
                </>
              ) : (
                <Dropzone onDrop={handleImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="selecionar-imagem">
                      <input {...getInputProps()} />
                      <p>Arraste e solte uma imagem aqui ou clique para selecionar uma.</p>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
        </div>
      )}
                </div>
            </div>
        )
    );
};

export default Userprofile;