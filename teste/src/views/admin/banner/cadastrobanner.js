import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./BannerCadastro.css";
import NavbarAdm from "../../../componentes/navbaradm/navbaradm";

const BannerCadastro = () => {
  const [banners, setBanners] = useState([]);
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/banners");
      setBanners(response.data);
    } catch (error) {
      console.error("Erro ao buscar banners:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setAltText("");
    setUploadStatus("Imagem selecionada. Insira o texto alternativo e clique em 'Salvar'");
  };

  const handleDeleteBanner = async (bannerId) => {
    try {
      await axios.delete(`http://localhost:3000/banners/${bannerId}`);
      const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
      setBanners(updatedBanners);
    } catch (error) {
      console.error("Erro ao excluir banner:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("alt", altText);
      formData.append("file", imageFile);

      await axios.post("http://localhost:3000/banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBanners([...banners, { alt: altText, image: URL.createObjectURL(imageFile) }]);
      setAltText("");
      setImageFile(null);
      setUploadStatus("Banner cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar banner:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div>
      <NavbarAdm />
      <div className="banner-cadastro-container">
        <h2>Cadastrar Banner</h2>
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arraste e solte uma imagem aqui ou clique para selecionar.</p>
          <p>Descrição da imagem (Alt):</p>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <button onClick={handleSubmit}>Salvar</button>
        </div>
        {uploadStatus && <p>{uploadStatus}</p>}
        <div className="banners-list">
          {banners.map((banner, index) => (
            <div key={index} className="banner-item">
              <img
                src={banner.image}
                alt={banner.alt}
                className="banner-thumbnail"
              />
              <button onClick={() => handleDeleteBanner(banner.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCadastro;
