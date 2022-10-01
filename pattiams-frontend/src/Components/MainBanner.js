import React from 'react'
import './MainBanner.css'
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';

const MainBanner = () => {
  return (
    <>
    <Carousel controls={false} interval={2000}>

      <Carousel.Item>
        <img className="d-none d-md-block w-100" src="images/ayurveda-pc-new.png" alt="Second slide" />
        <div className="d-block d-md-none mobile-banner-div">
            <img className="w-100" src="images/ayurveda-mob-new.png" alt="Second slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-none d-md-block w-100" src="images/beautycare-pc.png" alt="Third slide" />
        <div className="d-block d-md-none mobile-banner-div">
            <img className="w-100" src="images/beautycare-mob.png" alt="Third slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-none d-md-block w-100" src="images/foods-pc-new.png" alt="Third slide" />
        <div className="d-block d-md-none mobile-banner-div">
            <img className="w-100" src="images/foods-mob-new.png" alt="Third slide" />
        </div>
        {/* <Carousel.Caption className='banner-slide-text'>
          <Image className="carousel-cat-logo" src="images/pattiams-foods-logo-final.svg" />
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-none d-md-block w-100" src="images/furniture-pc-new.png" alt="Third slide" />
        <div className="d-block d-md-none mobile-banner-div">
            <img className="w-100" src="images/furniture-mob-new.png" alt="Third slide" />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-none d-md-block w-100" src="images/abhyanga-pc-new.png" alt="First slide" />
        <div className="d-block d-md-none mobile-banner-div">
            <img className="w-100" src="images/abhyanga-mob-new.png" alt="First slide" />
        </div>
      </Carousel.Item>
      
    </Carousel>
    </>
  )
}

export default MainBanner