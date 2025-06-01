import React from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div>
      <div className="container" id="shop">
        {/* Header section */}
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        {/* Body section */}
        <ProductCard />
      </div>
    </div>
  );
};

export default Products;
