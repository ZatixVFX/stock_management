import React from "react";

import AddStock from "./AddStock";

const Home = () => {
  return (
    <div className="container">
      <div className="row row-cols-1">
        <AddStock />
      </div>
    </div>
  );
};

export default Home;
