import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StockLevel = ({ stock: { user_stock } }) => {
  const avgPrice = (product) => {
    return user_stock.stock.filter(
      (item) => item.name === product && item.price / 2
    );
  };
  return (
    <div className="col">
      {user_stock.stock.map((item) => (
        <Fragment>
          <div className="col">
            <h1>{item.name}</h1>
            <p>{avgPrice(item.name)}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

StockLevel.propTypes = {
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(StockLevel);
