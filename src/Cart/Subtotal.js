import { useContext } from "react";
import CartContext from "../store/cart-context";



import './Subtotal.css';
import { useHistory } from 'react-router-dom';
const Subtotal = () => {

  
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const hasItems = cartCtx.items.length > 0

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const history = useHistory();
  
  const paymentHandler = (event) => {
    event.preventDefault();
    history.push('/payment')
  };


 return <div className='subtotal'>
  
            <p>
              
              Subtotal ({numberOfCartItems} items): <strong>{totalAmount}</strong>
            </p>
            {hasItems && <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>}

      {hasItems && <button onClick={paymentHandler}>Proceed to Checkout</button>}
 </div>
}

export default Subtotal;