import React, { useState } from "react";
import "./RadioButton.css";



const RadioButton = () => {
  const [ productSize, setProductSize ] = useState("50ml");
  return (
    <div className="row">
      <div className="col-12 col-lg-3">
        <input type="radio" name="size" id="50ml" value="50ml" onChange={(e)=> setProductSize(e.target.value)} checked={productSize==="50ml"} />
        <label >50 ml</label>
      </div>
      <div className="col-12 col-lg-3">
        <input type="radio" name="size" id="100ml" value="100ml" onChange={(e)=> setProductSize(e.target.value)} checked={productSize==="100ml"} />
        <label >100 ml</label>
      </div>
      <div className="col-12 col-lg-3">
        <input type="radio" name="size" id="200ml" value="200ml" onChange={(e)=> setProductSize(e.target.value)} checked={productSize==="200ml"} />
        <label >200 ml</label>
      </div>
      <div className="col-12 col-lg-3">
        <input type="radio" name="size" id="500ml" value="500ml" onChange={(e)=> setProductSize(e.target.value)} checked={productSize==="500ml"} />
        <label >500 ml</label>
      </div>
    </div>
  );
};

export default RadioButton;
