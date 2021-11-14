

const PaymentProducts = (props) => {
    return     <div className="checkoutProduct">
    <img className="checkoutProduct__image" src={props.image} />

    <div className="checkoutProduct__info">
      <p className="checkoutProduct__title">{props.title}</p>
      <p className="checkoutProduct__price">
        <small>$</small>
        <strong>{props.price}</strong>
      </p>
      <span>x {props.amount}</span>
      <div className="checkoutProduct__rating">
        {Array(props.rating)
          .fill()
          .map((_, i) => (
            <p>⭐</p>
          ))}
      </div>
  </div>
  </div>
}

export default PaymentProducts;