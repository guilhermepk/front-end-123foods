import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationbarAdm from '../../../componentes/Adm/NavigationbarAdm/NavigationbarAdm';
import './Bannerlist.css'
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';
import { useNavigate } from 'react-router-dom';
const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const navigate = useNavigate();
    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/banners`);
            setBanners(response.data);
        } catch (e) {
            iziToast.error({position: 'bottomRight',timeout: 5000,onClosed:navigate('/admin/bannerlist'),message:"Banners não encontrados "
        })
        }
    };

    const handleDeleteBanner = async (bannerId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_HOST}/banners/${bannerId}`);
            const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
            setBanners(updatedBanners);
            iziToast.success({position: 'bottomRight',timeout: 5000,onClosed:navigate('/admin/bannerlist'),message:"Banner excluido com sucesso "
    })
        } catch (e) {
            iziToast.error({position: 'bottomRight',timeout: 5000,onClosed:navigate('/admin/bannerlist'),message:"Problema ao excluir o banner "
        })
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <>
            <NavigationbarAdm />
            <div className="banner-list-container">
                <h1 className="titulo-banner">Listagem de Banners</h1>
                <div className="banner-list">
                    {banners.map((banner) => (
                        <div key={banner.id} className="banner-item">
                            <div className="thumbnail-container">
                                <img src={`${process.env.REACT_APP_HOST}/uploads/${banner.image}`} alt={banner.alt} className="thumbnail" />
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
