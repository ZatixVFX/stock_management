import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  del_UserStock,
  get_UserStock,
  stockAlert,
  clearErrors,
} from "../../actions/stockAction";

const RemoveStock = ({
  del_UserStock,
  get_UserStock,
  stockAlert,
  clearErrors,
  stock: { successfullyRemovedStock_msg },
  user_stock,
}) => {
  const [product, setProduct] = useState(0);

  useEffect(() => {
    if (successfullyRemovedStock_msg) {
      stockAlert(successfullyRemovedStock_msg, "warning");
      get_UserStock();
      clearErrors();
    }
    // eslint-disable-next-line
  }, [successfullyRemovedStock_msg]);

  let itemsBought = user_stock["stock"][product].items;

  const getProduct = (e) => {
    setProduct(e.target.options.selectedIndex);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user_stock) {
      const product_id = user_stock.stock.find(
        (item) => item.name === e.target.name.value && item
      );

      product_id && del_UserStock(product_id._id);
    }
  };

  return (
    <div className="col mt-4">
      <form onSubmit={onSubmit}>
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Select a Product Code
          </label>
          <select
            name="name"
            id=""
            className="form-control"
            onChange={getProduct}
          >
            {user_stock &&
              user_stock["stock"].map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Buyer email address
          </label>
          <input
            type="email"
            name="items_recieved"
            value={user_stock["user"].email}
            id=""
            className="form-control"
            disabled
          />
        </div>
        <div className="mb3">
          <label htmlFor="" className="form-label">
            Items bought
          </label>
          <input
            type="text"
            name="price"
            value={itemsBought}
            id=""
            className="form-control"
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary mt-1">
          Remove stock
        </button>
      </form>
    </div>
  );
};

RemoveStock.propTypes = {
  del_UserStock: PropTypes.func.isRequired,
  get_UserStock: PropTypes.func.isRequired,
  stockAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired,
  user_stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  user_stock: state.user_stock,
});

export default connect(mapStateToProps, {
  del_UserStock,
  get_UserStock,
  stockAlert,
  clearErrors,
})(RemoveStock);
