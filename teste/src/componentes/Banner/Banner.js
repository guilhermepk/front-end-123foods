import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Banner.css';
import { Link } from 'react-router-dom';

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/banners`)
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar banners:', error);
      });
  }, []);

  return (
    <main className='principal'>
      <div className="banner">
        <Carousel className="imagem-banner" showThumbs={false}>
          {banners.map((banner) => (
            <Link to={`${banner.link}`}>
            <div key={banner.id} className='banner-img'>
              <img
                src={`${process.env.REACT_APP_HOST}/uploads/${banner.image}`}
                alt={banner.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px 18px 0 0' }}
              />
            </div></Link>
          ))}
        </Carousel>
      </div>
      </main>
  );
}

export default Banner;
{/* ${banner[banner.id].link} */}