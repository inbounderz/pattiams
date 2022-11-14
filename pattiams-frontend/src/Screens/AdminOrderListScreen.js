import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listOrders } from "../Actions/orderActions";
import moment from 'moment';

import AdminSidebar from "../Components/AdminSidebar";

const AdminOrderListScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Row>
      <Col xs={2}>
        <AdminSidebar />
      </Col>
      <Col xs={9}>
        <div className="ms-2 mt-2">
          <h1>Orders</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL PRICE</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{moment(order.createdAt).utc().format('DD/MM/YYYY')}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        moment(order.paidAt).utc().format('DD/MM/YYYY')
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        moment(order.deliveredAt).utc().format('DD/MM/YYYY')
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button variant='light' className='btn-sm'>
                                Details
                            </Button>
                        </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AdminOrderListScreen;
