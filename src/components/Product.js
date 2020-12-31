import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { productDetails } from "../actions/productAction";

const Product = ({ _id, name, image, price, rating, numReviews }) => {
  const dispatch = useDispatch();
  return (
    <Card className='my-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img
          src={image}
          variant='top'
          fluid='true'
          onClick={() => dispatch(productDetails(_id))}
          className='product-image'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div'>
            <h2>{name}</h2>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={rating} text={` ${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
