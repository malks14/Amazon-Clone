import { useContext } from 'react';

import CartContext from '../store/cart-context';
import Subtotal from './Subtotal'
import "./Checkout.css";
import { useStateValue } from '../store/use-context';
import CheckoutProduct from './CheckoutProduct';



const Checkout = () => {

  const cartCtx = useContext(CartContext);


 
  const [{basket, user}, dispatch] = useStateValue();
  
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  };

  
      
 
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Checkput ad"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className='checkout__title'>Your shopping basket</h2>
          {cartCtx.items.map(item => (
            <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            amount={item.amount}
            price={item.price}
            rating={item.rating}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            />
          ))}
        </div>
      </div>

      <div className='checkout__right'>
          <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
