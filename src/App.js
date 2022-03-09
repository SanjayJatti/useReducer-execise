import React, { useReducer } from "react";
import "./styles.css";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

const reducerFnc = (state, action) => {
  switch (action.type) {
    case "SORT-BY":
      return { ...state, sortBy: action.payload };
    case "FILTER-BY-STOCK":
      return { ...state, inStockOnly: !state.inStockOnly };
    case "FILTER-BY-DELIVERY":
      return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly };
    default:
      return state;
  }
};

export default function App() {
  const [
    { products, sortBy, inStockOnly, fastDeliveryOnly },
    dispatch
  ] = useReducer(reducerFnc, {
    products: data,
    sortBy: false,
    inStockOnly: false,
    fastDeliveryOnly: false
  });

  const filteredProducts = () => {
    let transformedProducts = products;

    if (sortBy) {
      transformedProducts = transformedProducts.sort((a, b) =>
        sortBy === "PRICE-LOW-TO-HIGH" ? a.price - b.price : b.price - a.price
      );
    }

    if (inStockOnly) {
      transformedProducts = transformedProducts.filter((item) => item.inStock);
    }

    if (fastDeliveryOnly) {
      transformedProducts = transformedProducts.filter(
        (item) => item.fastDelivery
      );
    }

    return transformedProducts;
  };

  return (
    <>
      <div>
        <div>
          <label>
            <input
              type="radio"
              checked={sortBy === "PRICE-LOW-TO-HIGH" ? true : false}
              onChange={() =>
                dispatch({ type: "SORT-BY", payload: "PRICE-LOW-TO-HIGH" })
              }
            />
            Price : Low to High
          </label>
          <label>
            <input
              type="radio"
              checked={sortBy === "PRICE-HIGH-TO-LOW" ? true : false}
              onChange={() =>
                dispatch({ type: "SORT-BY", payload: "PRICE-HIGH-TO-LOW" })
              }
            />
            Price : High to Low
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => dispatch({ type: "FILTER-BY-STOCK" })}
            />
            In Stock Only
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={fastDeliveryOnly}
              onChange={() => dispatch({ type: "FILTER-BY-DELIVERY" })}
            />
            Fast Delivery Only
          </label>
        </div>
      </div>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts().map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
