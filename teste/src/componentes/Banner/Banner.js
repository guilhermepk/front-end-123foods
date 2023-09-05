import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Banner.css';

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/banners')
      .then((response) => response.json())
      .then((data) => {
        setBanners(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar banners:', error);
      });
  }, []);

  return (
      <div className="banner">
        <Carousel showThumbs={false}>
          {banners.map((banner) => (
            <div key={banner.id} className='banner-img'>
              <img
                className="img1"
                src={`http://localhost:3000/uploads/${banner.image}`}
                alt={banner.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px 18px 0 0' }}
              />
            </div>
          ))}
        </Carousel>
      </div>
  );
}

export default Banner;
