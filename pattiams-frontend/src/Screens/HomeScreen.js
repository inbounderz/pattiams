import React, { useState } from "react";
import CategoryBar from "../Components/CategoryBar";
import Products from "../Components/Products";
import MainBanner from "../Components/MainBanner";
import PopularProducts from "../Components/PopularProducts";
import AboutPattiams from "../Components/AboutPattiams";
import AlertMessage from "../Components/AlertMessage";

const HomeScreen = () => {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <AlertMessage alert={alert} />
      <MainBanner />
      <CategoryBar />
      <PopularProducts showAlert={showAlert}/>
      <Products showAlert={showAlert} />
      <AboutPattiams />
    </>
  );
};

export default HomeScreen;
