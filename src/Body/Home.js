import { useEffect, useState } from "react";

import styles from  "./Home.css";
import Products from "../Products/Products";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://clone-app-850bb-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          title: responseData[key].title,
          price: responseData[key].price,
          image: responseData[key].image,
          rating: responseData[key].rating,
        });
      }
      setProducts(loadedProducts);
      setIsLoading(false)
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    })
  }, []);

  if (isLoading) {
    return <section className={styles.ProductsLoading}>
        <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={styles.ProductsError}>
      <p>{httpError}</p>
    </section>
  }

  const productsList = products.map(product => <Products 
    key={product.id} 
    id={product.id}
    title={product.title}
    rating={product.rating}
    price={product.price}
    image={product.image}
    />)

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          {productsList[0]}
          {productsList[1]}
        </div>

        <div className="home__row">
        {productsList[2]}
        {productsList[3]}
        {productsList[4]}
        </div>

        <div className="home__row">
        {productsList[5]}
        </div>
      </div>
    </div>
  );
};

export default Home;
