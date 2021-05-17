import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faHeart, faMedal, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import MeliButton from "components/Button";
import Chips from "components/Chips";
import { Utils } from "helpers/Utils";
import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import HttpClient from "../commons/HttpClient";
import { Endpoints } from "../config";
import { Attribute, IProductDetails } from "../interfaces/IProductDetails";
import Loading from "components/Loading";
import Empty from "components/Empty";

type QueryParams = { id: string };

const ProductDetails = ({ match }: RouteComponentProps<QueryParams>) => {
    const history = useHistory();
    const {
        params: { id },
    } = match;
    const [product, setProduct] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProductDetails();
        //console.log(id);
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
        //console.log(response);
        //console.log(response.data);
        //console.log(pd);
        setProduct(pd);
        //console.log(product);
    };

    const successDescription = (response: any) => {
        //console.log(response);
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

    const handleBack = () => {
        history.goBack();
    };

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : product != null ? (
                <>
                    <nav className="px-4 text-xs text-gray-500 text-opacity-60 mt-2">
                        <ul className="flex flex-row">
                            <li className="breadcrumb-item mr-2">
                                <Link onClick={handleBack} to="/">
                                    Listado de Productos
                                </Link>
                            </li>
                            <li className="breadcrumb-chev mr-2">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </li>
                            <li className="breadcrumb-item mr-2">{product.title}</li>
                        </ul>
                    </nav>
                    <article className="bg-white p-6 m-4 shadow-sm rounded-md">
                        <div className="grid lg:grid-cols-3 gap-4">
                            <section className="lg:col-span-2">
                                <div className="flex items-center justify-center">
                                    <img
                                        alt={product.title}
                                        className="object-contain h-80"
                                        src={product.pictures[0].url}
                                    />
                                </div>
                            </section>
                            <section className="">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">
                                        {product.condition === "new" ? <Chips title="Nuevo"></Chips> : ""}{" "}
                                        {product.available_quantity === 1 ? (
                                            <Chips title="Ultima unidad" color="bg-red-500"></Chips>
                                        ) : (
                                            ""
                                        )}{" "}
                                        <span className="mx-2 text-gray-300">|</span>
                                        <span className="text-gray-400 text-sm">{product.sold_quantity} vendidos</span>
                                    </div>
                                    <div className="button-wrapper">
                                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                            <FontAwesomeIcon icon={faHeart} className="text-meliBlue cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xl my-3">{product.title}</p>
                                <div className="flex flex-col">
                                    <del
                                        className={`text-gray-400 text-sm ${
                                            product.price !== product.original_price && product.original_price
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
                                        {product.price !== product.original_price && product.original_price ? (
                                            <span className="ml-2 text-base text-meliGreen">
                                                {Utils.findPercent(product.original_price, product.price)}% OFF
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                </div>
                                <MeliButton onClick={() => console.log("clicked")}>{"Comprar Ahora"}</MeliButton>
                                <ul className="text-sm text-gray-400">
                                    <li className="flex py-3 h-full">
                                        <FontAwesomeIcon icon={faShieldAlt} className="mr-3 mt-1" />
                                        <p className="title-font font-medium">
                                            <Link to="" className="text-meliBlue">
                                                Compra Protegida
                                            </Link>
                                            , recibe el producto que esperabas o te devolvemos tu dinero.
                                        </p>
                                    </li>
                                    {product.warranty ? (
                                        <li className="flex py-3 h-full">
                                            <FontAwesomeIcon icon={faMedal} className="mr-3" />
                                            <p className="title-font font-medium">{product.warranty}</p>
                                        </li>
                                    ) : (
                                        ""
                                    )}
                                </ul>
                            </section>
                            <section className="py-4 lg:col-span-2 mr-6">
                                <p className="text-lg mb-2">Características del producto</p>
                                <p className="mb-4 leading-relaxed">
                                    {productDescription ? productDescription.plain_text : ""}
                                </p>
                                {product.attributes.map((attr: Attribute, index: any) => (
                                    <div key={index} className="flex border-t border-gray-200 py-2 text-sm">
                                        <span className="text-gray-500">{attr.name}</span>
                                        <span className="ml-auto text-gray-900">{attr.value_name}</span>
                                    </div>
                                ))}
                            </section>
                            <section className="bg-gray-50 p-3"></section>
                        </div>
                    </article>
                </>
            ) : (
                <Empty text="No hay producto para mostrar"></Empty>
            )}
        </>
    );
};

export default ProductDetails;
