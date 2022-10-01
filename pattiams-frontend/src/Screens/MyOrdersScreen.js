import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listMyOrders } from "../Actions/orderActions";
import { LinkContainer } from 'react-router-bootstrap';

const MyOrdersScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
    }
  }, [userInfo, dispatch, navigate]);

  return (
    <Container className="my-5 d-flex justify-content-center flex-column">
      <Row>
        <Col>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PRICE</th>
                  <th>PAID ON</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0).reverse().map((order) => (
                  <tr key={order._id}>
                    <td className="order-id-td">{order._id}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10).split('').reverse().join('')
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10).split('').reverse().join('')
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyOrdersScreen;
