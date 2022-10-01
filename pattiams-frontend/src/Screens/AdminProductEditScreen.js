import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { listProductDetails, updateProduct } from "../Actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../Constants/productConstants";

const AdminProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = useParams().id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [variant, setVariant] = useState([]);
  const [countInStock, setCountInStock] = useState(0);

  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin-productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setImage(product.image);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setBenefits(product.benefits);
        setIngredients(product.ingredients);
        setHowToUse(product.howToUse);
        setVariant(product.variant);
      }
    }
  }, [product, dispatch, productId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        category,
        subCategory,
        countInStock,
        description,
        benefits,
        ingredients,
        howToUse,
        variant
      })
    );
  };

  const submitVariantHandler = (e) => {
    e.preventDefault();
    const variantInp = { model, price };
    setVariant([...variant, variantInp]);
    setModel("");
    setPrice(0);
  };

  const uploadFileHandler =  async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
      
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Container>
      <Link to="/admin-productlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1 className="mt-3">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value.replace(/\s/g,'').toLowerCase())}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="subCategory" className="mt-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-end mt-3">
              <Form.Group controlId="variant" className="col-5">
                <Form.Label>Variant</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter variant/model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price" className="col-5">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price of variant 1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                className="add-variant-btn"
                onClick={submitVariantHandler}
              >
                Add <i className="fa-solid fa-check"></i>
              </Button>
            </div>
            <p className="text-danger" style={{ fontSize: "12px" }}>
              *Add variant and price one after another in the above field.
              Remember to click 'Add' button every time to add.
            </p>

            <Form.Group controlId="image" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="benefits" className="mt-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              ></Form.Control>
            </Form.Group>
            

            <Form.Group controlId="ingredients" className="mt-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <p className="text-danger" style={{ fontSize: "12px" }}>
              *Add each items separated by comma
            </p>

            <Form.Group controlId="howToUse" className="mt-3">
              <Form.Label>How to use</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter How To Use"
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mt-3">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default AdminProductEditScreen;
