import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  productDetails,
  productReviewSaveAction,
} from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: productSaveSuccess } = useSelector(
    (state) => state.productReviewSave
  );

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(productDetails(match.params.id));
  }, [dispatch, match, productSaveSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReviewSaveAction(match.params.id, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (product) {
      setReviews(product.reviews);
    }
  }, [product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const { name, image, price, numReviews, description, countInStock } = product;
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md='3'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` ${numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn btn-block'
                      type='button'
                      disabled={countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={6} sm={12} className='mt-3'>
              <h3>Write a customer review</h3>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Control
                      as='select'
                      name='rating'
                      id='rating'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}>
                      <option value='1'>1- Poor</option>
                      <option value='2'>2- Fair</option>
                      <option value='3'>3- Good</option>
                      <option value='4'>4- Very Good</option>
                      <option value='5'>5- Excelent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      name='comment'
                      placeholder='Enter your comment...'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button type='submit'>Submit</Button>
                </Form>
              ) : (
                <div>
                  Please <Link to='/login'>Sign-in</Link> to write a review.
                </div>
              )}
            </Col>
            <Col md={6} sm={12} className='mt-3'>
              <h2>Reviews</h2>
              {reviews && reviews.length === 0 && <div>There is no review</div>}
              {reviews &&
                reviews.map((review) => (
                  <Card className='mb-2'>
                    <Card.Body key={review._id}>
                      <div>{review.name}</div>
                      <div>
                        <Rating value={review.rating}></Rating>
                      </div>
                      <div>{review.createdAt.substring(0, 10)}</div>
                      <div>{review.comment}</div>
                    </Card.Body>
                  </Card>
                ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
