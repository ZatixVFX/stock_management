import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const RemoveStock = ({ stock: { user_stock } }) => {
  const [product, setProduct] = useState(0);

  const getProduct = (e) => {
    setProduct(e.target.value);
  };

  console.log(user_stock["user"].email);
  return (
    <div className="col mt-4">
      <form>
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
            {user_stock &&
              user_stock["stock"].map((item, index) => (
                <option value={index} key={index}>
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
            value={user_stock["stock"][product].items}
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
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(RemoveStock);
