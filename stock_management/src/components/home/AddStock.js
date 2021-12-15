import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  add_UserStock,
  stockAlert,
  clearErrors,
} from "../../actions/stockAction";

const AddStock = ({
  stockAlert,
  clearErrors,
  add_UserStock,
  auth: { user },
  stock: {
    available_stock,
    stock_alert,
    user_stock,
    error,
    successfullyAddedStock_msg,
  },
}) => {
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

  // Display amount of items by day
  let num_of_items = available_stock[product].items.find(
    (n, index) => date.getDay() === index && n
  );
  // Check if current day has a discount
  let current_day = days[date.getDay()];
  let get_discount = available_stock[product].days_of_discount.find(
    (n) => n.day === current_day && n
  );

  // Get price
  let get_price = available_stock[product].price * num_of_items;

  // Return final price
  let final_price = !get_discount
    ? get_price
    : (get_discount.discount_percentage / 100) * get_price;

  const onChange = (e) => {
    setProduct(e.target.options.selectedIndex);
  };

  useEffect(() => {
    if (error === "Max product stock is 3") {
      stockAlert(error, "danger");
      clearErrors();
    } else if (error === "This product is already in your inventory") {
      stockAlert(error, "danger");
      clearErrors();
    } else if (successfullyAddedStock_msg) {
      stockAlert(successfullyAddedStock_msg, "success");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, successfullyAddedStock_msg]);
  const onSubmit = (e) => {
    e.preventDefault();

    let name = e.target.name.value;
    let items = e.target.items.value;
    let price = e.target.price.value;
    add_UserStock(
      {
        user_name: user.name,
        user_email: user.email,
        name,
        items,
        price,
      },
      user_stock._id ? user_stock._id : null
    );
  };

  return (
    <div className="col">
      <form action="" onSubmit={onSubmit}>
        {stock_alert &&
          stock_alert.map((alert, index) => (
            <div
              className={`alert alert-${alert.type} alert-dismissible`}
              role="alert"
              key={index}
            >
              <i class="fas fa-times"></i> {alert.msg}
            </div>
          ))}
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Select a Product Code
          </label>
          <select
            name="name"
            id=""
            className="form-control"
            onChange={onChange}
          >
            {available_stock &&
              available_stock.map((item, index) => (
                <option value={item.name} key={index}>
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
            name="items"
            value={num_of_items}
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
        <input
          type="submit"
          className="btn btn-primary mt-1"
          value="Add Stock"
        />
      </form>
    </div>
  );
};

AddStock.propTypes = {
  stockAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  stock: PropTypes.object.isRequired,
  add_UserStock: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  stock: state.stock,
});

export default connect(mapStateToProps, {
  add_UserStock,
  clearErrors,
  stockAlert,
})(AddStock);
