import React from 'react'
import './CategoryHeading.css'

const Category = () => {
  return (
    <>
        <div className="product-category-heading-div mb-5 d-none d-lg-block">
          <div className="d-flex align-items-center">
            <div className="p-5">
              <div className="pattiams-ayurveda-icon me-4">
                <img className="pattiams-ayurveda-icon-img" src="images/pattiams_ayurveda_icon.svg" alt="pattiams_ayurveda_icon" />
              </div>
            </div>
            <div className="pattiams-ayurveda-img me-2">
              <img src="images/pattiams_ayurveda_img.svg" alt="pattiams_ayurveda_icon"/>
            </div>
            <div className="p-5">
              <span className="pattiams-category-desc">Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
            </div>
          </div>
        </div>

        <div className='d-flex d-lg-none flex-column align-items-center'>
            <img src='images/pattiams_ayurveda_icon.svg' />
            <div className='pattiams-category-heading-mobile'>
                <span className='pattiams-category-heading-text'>Lorem ipsum dolor sit amet, consectetuer adipiscing</span>
            </div>
        </div>
    </>
  )
}

export default Category