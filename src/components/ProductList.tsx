import { Result } from "interfaces/ISearchResults";
import React from "react";
import ProductItemCard from "./ProductItemCard";

const ProductList = ({ data = [] }) => {
    return (
        <>
            {data.map((product: Result, index) => (
                <ProductItemCard data={product}></ProductItemCard>
            ))}
        </>
    );
};

export default ProductList;
