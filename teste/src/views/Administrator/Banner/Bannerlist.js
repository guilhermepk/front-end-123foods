import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdm from '../../../componentes/NavigationbarAdm/NavigationbarAdm';
import './Bannerlist.css'

const BannerList = () => {
    const [banners, setBanners] = useState([]);

    const fetchBanners = async () => {
        try {
            const response = await axios.get('http://localhost:3000/banners');
            setBanners(response.data);
        } catch (error) {
            console.error('Erro ao buscar banners:', error);
        }
    };

    const handleDeleteBanner = async (bannerId) => {
        try {
            await axios.delete(`http://localhost:3000/banners/${bannerId}`);
            const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
            setBanners(updatedBanners);
        } catch (error) {
            console.error('Erro ao excluir banner:', error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <>
            <NavbarAdm />
            <div className="banner-list-container">
                <h1 className="titulo-banner">Listagem de Banners</h1>
                <div className="banner-list">
                    {banners.map((banner) => (
                        <div key={banner.id} className="banner-item">
                            <div className="thumbnail-container">
                                <img src={`http://localhost:3000/uploads/${banner.image}`} alt={banner.alt} className="thumbnail" />
                            </div>
                            <div className="banner-info">
                                <p>{banner.alt}</p>
                                <button className="botao-excluir-banner" onClick={() => handleDeleteBanner(banner.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BannerList;
