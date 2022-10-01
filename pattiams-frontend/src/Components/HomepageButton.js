import React from 'react'
import './HomepageButton.css'

const HomepageButton = ({ text }) => {
  return (
    <>
        <div className="d-flex justify-content-center mt-3 mb-5">
          <div className="view-more-products-button"><span className="add-to-cart-text">{text}</span></div>
        </div>
    </>
  )
}

export default HomepageButton