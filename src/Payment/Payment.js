import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useStateValue } from "../store/use-context";
import "./Payment.css";
import CheckoutProduct from "../Cart/CheckoutProduct";
import PaymentProducts from './PaymentProducts'
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getBasketTotal } from "../store/use-reducer";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import CartContext from "../store/cart-context";

const Payment = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  };

  useEffect(() => {
    //special stripewhich allows to charge customer. * 100 axios es porque axios espera recibir centavos/subunits
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const stripe = useStripe();
  const elements = useElements();

  const submitHandler = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setProcessing(false);
        setError(null);
        history.replace("/orders");
      });
  };

  const changeHandle = (event) => {
    setDisabled(event.empyty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {" "}
          Checkout (<Link to="/checkout">{numberOfCartItems} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h1>Delivery Address</h1>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>street</p>
            <p>city</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Reviews items and delivery</h3>
          </div>
          <div className="payment__items">
            {cartCtx.items.map((item) => (
              <PaymentProducts
                key={item.id}
                id={item.id}
                amount={item.amount}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={submitHandler}>
              <CardElement onChange={changeHandle} />
              <div className="payment__priceContainer">
                <h3>Order total: {totalAmount}</h3>

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
