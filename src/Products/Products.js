import { useContext } from 'react';
import './Products.css'
import ProductItemForm from "./ProductItemForm";
import CartContext from '../store/cart-context';


const Products = (props) => {

  const cartCtx =  useContext(CartContext)

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      title: props.title,
      amount: amount,
      image: props.image,
      rating: props.rating,
      price: props.price
    })
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{props.title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{props.price}</strong>
        </p>
        <div className="product__rating">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={props.image} />
      <ProductItemForm onAddToCart={addToCartHandler}/>
    </div>
  );
};

export default Products;
