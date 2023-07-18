import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await axios.patch('http://localhost:3000/users/4/upload', formData);
      console.log(response.data);
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedImage(URL.createObjectURL(file));
    },
  });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Arraste o arquivo aqui...</p>
        ) : (
          <p>Arraste e solte o arquivo aqui ou clique para selecionar</p>
        )}
        {selectedImage && (
          <div className="thumbnail">
            <img src={selectedImage} alt="Thumbnail" />
            <p>{selectedImage.name}</p>
          </div>
        )}
      </div>
      <button onClick={onDrop} disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
};

export default ImageUpload;
