import { useEffect } from "react";
import CartProvider from "./store/CartProvider";
import "./App.css";
import Header from "./MainNavigation/Header";
import Home from "./Body/Home";
import { Route, Switch } from "react-router-dom";
import Checkout from "./Cart/Checkout";
import Login from "./Body/Login";
import { auth } from "./firebase";
import { useStateValue } from "./store/use-context";
import Payment from "./Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Jv9msJmz5Kc2orRIbqDXHJOXXFNlK8LYzZheRyNSQcFHM3Xmc2IHKjWmEHSI8zBYHcvOfrXq2eC8RPpsyPT45Pa00d7lsrzY1"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app components loads
    auth.onAuthStateChanged((authUser) => {
      console.log("USER IS >>>>", authUser);

      if (authUser) {
        //the user is logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </CartProvider>
  );
}

export default App;
