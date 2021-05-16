import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBorderAll
} from "@fortawesome/free-solid-svg-icons";
import MeliButton from "components/Button";
import Chips from "components/Chips";
import { Utils } from "helpers/Utils";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import HttpClient from "../commons/HttpClient";
import { Endpoints } from "../config";
import { Attribute, IProductDetails } from "../interfaces/IProductDetails";
import Loading from "components/Loading";

type QueryParams = { id: string };

const ProductDetails = ({ match }: RouteComponentProps<QueryParams>) => {
    const {
        params: { id },
    } = match;
    const [product, setProduct] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProductDetails();
        console.log(id);
    }, [id]);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            HttpClient.get(Endpoints.ITEM.replace("{:id}", `${id}`), {}, success, error, always);
            HttpClient.get(Endpoints.ITEM_DESCRIPTION.replace("{:id}", `${id}`), {}, successDescription, error, always);
            //setProduct(result);
        } catch (e) {
            error(e);
        }
    };

    const success = (response: any) => {
        //const product = response.data;
        const pd: IProductDetails = response.data;
        console.log(response);
        console.log(response.data);
        console.log(pd);
        setProduct(pd);
        //console.log(product);
    };

    const successDescription = (response: any) => {
        console.log(response);
        setProductDescription(response.data);
    };

    const error = (e: any) => {
        console.log(e);
        setHasError(true);
        //notification here
    };

    const always = () => {
        setLoading(false);
    };

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : product != null ? (
                <article className="bg-white p-6 m-2 md:m-0 shadow-sm rounded-md">
                    <div className="grid lg:grid-cols-3">
                        <section className="lg:col-span-2">
                            <div className="flex items-center justify-center">
                                <img className="object-contain h-80" src={product.pictures[0].url} />
                            </div>
                        </section>
                        <section className="">
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center">
                                    {product.condition == "new" ? <Chips title="Nuevo"></Chips> : ""}{" "}
                                    {product.available_quantity == 1 ? (
                                        <Chips title="Solo queda 1" color="bg-red-500"></Chips>
                                    ) : (
                                        ""
                                    )}{" "}
                                    <span className="mx-2 text-gray-300">|</span>
                                    <span className="text-gray-400 text-sm">{product.sold_quantity} vendidos</span>
                                </div>
                                <div className="">
                                    <FontAwesomeIcon icon={faBorderAll} />
                                </div>
                            </div>
                            <p className="text-xl my-3">{product.title}</p>
                            <div className="flex flex-col">
                                <del
                                    className={`text-gray-400 text-sm ${
                                        product.price != product.original_price && product.original_price
                                            ? ""
                                            : "invisible"
                                    }`}
                                >
                                    <span className="mr-1">{product.currency_id}</span>
                                    <span>{product.original_price}</span>
                                </del>
                                <p className="text-3xl font-light mb-3 flex flex-row items-baseline">
                                    <span className="mr-2 text-lg">{product.currency_id}</span>
                                    {product.price}
                                    {product.price != product.original_price && product.original_price ? (
                                        <span className="ml-2 text-base text-meliGreen">
                                            {Utils.findPercent(900, 500)}% OFF
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </div>
                            <MeliButton onClick={() => console.log("clicked")}>{"Comprar Ahora"}</MeliButton>
                        </section>
                    </div>
                    <section className="py-4">
                        <p className="text-lg mb-2">Características del producto</p>
                        <p className="mb-4">{productDescription ? productDescription.plain_text : ""}</p>
                        {product.attributes.map((attr: Attribute, index: any) => (
                            <p key={index}>
                                <strong>
                                    {attr.name}
                                    {": "}
                                </strong>
                                {attr.value_name}
                            </p>
                        ))}
                    </section>
                </article>
            ) : (
                "No hay producto para mostrar"
            )}
        </>
    );
};

export default ProductDetails;
