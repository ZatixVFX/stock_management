import React, { useState } from "react";
var stock = require("./stock.json");

const AddStock = () => {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [product, setProduct] = useState(0);

  const getProduct = (e) => {
    setProduct(e.target.value);
  };

  // Display amount of items by day
  let items = stock[product].items.filter(
    (n, index) => date.getDay() === index && n
  );

  // Check if current day has a discount
  let current_day = days[date.getDay()];
  let get_discount = stock[product].days_of_discount.filter(
    (n) => n.day === current_day && n
  );

  // Get price
  let price = stock[product].price * items;

  // Display final price
  let final_price =
    get_discount.length === 0
      ? price
      : (get_discount[0].discount_percentage / 100) * price;

  return (
    <div className="col align-self-center">
      <form action="">
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Select a Product Code
          </label>
          <select
            name="products"
            id=""
            className="form-control"
            onChange={getProduct}
          >
            {stock.map((item, index) => (
              <option value={index} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Items recieved
          </label>
          <input
            type="text"
            name="items_recieved"
            value={items}
            id=""
            className="form-control"
            disabled
          />
        </div>
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Price per Item Recieved
          </label>
          <input
            type="text"
            name="price"
            value={final_price}
            id=""
            className="form-control"
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          Add stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
