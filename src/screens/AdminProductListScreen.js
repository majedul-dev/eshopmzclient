import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  deleteProduct,
  listProducts,
  productDetails,
} from "../actions/productAction";

const AdminProductListScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const { success } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, success]);
  return (
    <>
      <Link to='/admin/createproduct'>
        <Button>Create Product</Button>
      </Link>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Col className='py-3'>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>NAME</td>
                  <td>PRICE</td>
                  <td>BRAND</td>
                  <td>QTY</td>
                  <td>DELIVERED</td>
                  <td>ACTIONS</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      {product.isDelivered ? (
                        <i
                          className='fas fa-check'
                          style={{ color: "green" }}></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button
                          variant='flush'
                          className='btn-sm'
                          onClick={() => dispatch(productDetails(product._id))}>
                          <i
                            className='fas fa-edit'
                            style={{ color: "blue" }}></i>
                        </Button>
                      </Link>
                      <Button
                        variant='flush'
                        className='btn-sm'
                        onClick={() => dispatch(deleteProduct(product._id))}>
                        <i
                          className='fas fa-trash'
                          style={{ color: "red" }}></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AdminProductListScreen;
