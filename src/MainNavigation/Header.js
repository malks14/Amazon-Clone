import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../store/use-context";
import {auth} from '../firebase';
import { useContext } from "react";
import CartContext from "../store/cart-context";

const Header = () => {
  const cartCtx =  useContext(CartContext);
  const [{ basket, user }, dispatch] = useStateValue();

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const authHandler = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">

        <Link to={!user && "/login"}>
          <div onClick={authHandler} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'User' : user?.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Ordes</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__basketCount header__optionLineTwo">
              {numberOfCartItems}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
