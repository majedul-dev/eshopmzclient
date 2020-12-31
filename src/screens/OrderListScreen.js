import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails, getOrderList } from "../actions/orderAction";
import { Button, Table } from "react-bootstrap";

const OrderListScreen = () => {
  const dispatch = useDispatch();

  const [orderLists, setOrderLists] = useState([]);

  const { loading, orderList, error } = useSelector(
    (state) => state.getOrderList
  );

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  useEffect(() => {
    setOrderLists(orderList);
  }, [orderList]);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>USER</td>
              <td>DATE</td>
              <td>TOTAL</td>
              <td>PAID</td>
              <td>DELIVERED</td>
              <td>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {orderLists &&
              orderLists.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        className='fas fa-check'
                        style={{ color: "green" }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/order/${order._id}`}>
                      <Button
                        variant='light'
                        className='btn-sm'
                        onClick={() => dispatch(getOrderDetails(order._id))}>
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
