import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import AdminSidebar from "../Components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { createProduct, deleteProduct, listProducts } from "../Actions/productActions";
import { PRODUCT_CREATE_RESET } from '../Constants/productConstants';

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin-productlist/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts());
    }

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const addProductHandler = () => {
    dispatch(createProduct())
  };

  return (
    <>
      <Row>
        <Col xs={2}>
          <AdminSidebar />
        </Col>
        <Col xs={9}>
          <div className="ms-2 mt-2">
            <Row className="align-items-center">
              <Col>
                <h1>Products</h1>
              </Col>
              <Col className="text-end">
                <Button className="my-3" onClick={addProductHandler}>
                  <i className="fa-solid fa-plus"></i> Add Product
                </Button>
              </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CATEGORY</th>
                    <th>SUB-CATEGORY</th>
                    <th>PRICE</th>
                    <th>{`DISCOUNT PRICE (IF ANY)`}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td></td>
                      <td>{product.price}</td>
                      <td></td>
                      <td>
                        <LinkContainer
                          to={`/admin-productlist/${product._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminProductListScreen;
