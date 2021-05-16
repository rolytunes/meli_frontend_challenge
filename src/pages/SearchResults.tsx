import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState, useEffect, ChangeEvent} from "react";
import { useLocation, useHistory, Link} from "react-router-dom";
import HttpClient from "../commons/HttpClient";
import SearchBar from "../components/SearchBar";
import { Endpoints } from "../config";
import { ISearchResults, Result } from "../interfaces/ISearchResults";
import { faList, faBorderAll, faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp, faSortAmountDown, faSortAmountUp, faStore, faThLarge, faQuestionCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { IProductDetails } from "interfaces/IProductDetails";
import Breadcrumb from "components/Breadcrumb";
import ContentHeader from "components/ContentHeader";
import ProductItemCard from "components/ProductItemCard";
import ProductList from "components/ProductList";
import Loading from "components/Loading";

/* function useQuery() {
    return new URLSearchParams(useLocation().search);
} */

const SearchResults = () => {
    let params = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultsGrid, setResultsGrid] = useState(true);

    useEffect(() => {
        console.log(location.search);
        console.log(params.get("q"));

        /* history.listen((location) => {
            
            console.log(`You changed the page to: ${location.pathname}`);
            
        }); */
        if (params.get("q")) {
            fetchProductResults();
        } else {
            setProducts([]);
        }
    }, [params.get("q")]);

    const handleBack = () => {
        history.goBack();
    };

    const fetchProductResults = async () => {
        setLoading(true);
        let text = params.get("q");
        try {
            HttpClient.get(Endpoints.SEARCH.replace("{:query}", `${params.get("q")}`), {}, success, error, always);           
            //setProduct(result);
        } catch (e) {
            error(e);
        }  
    };

    const handleResultsGrid = () => {
        setResultsGrid(!resultsGrid);
        console.log(resultsGrid);
    }

    const success = (response: any) => {
        const data = response.data;
        //setPageData(response);
        //const pd: IProductDetails = response.data;
        //console.log(response);
        console.log(data);
        setPageData(data);
        setProducts(data.results);
        console.log(products);
    };

    const error = (e: any) => {
        console.log(e);
        setHasError(true);
        //notification here
    };

    const always = () => {
        setLoading(false);
    };
    
    const getTotalSearchResults = () => {
        let data: ISearchResults = pageData;
        let results: string = " resultados";
        return data.paging.total + results;
    }
    

    return (
        <>
            { loading ? <Loading></Loading> : 
            pageData != null ? (
                <>
                    {pageData.filters.length > 0 ? <Breadcrumb data={pageData}></Breadcrumb> : ""}                    
                    <ContentHeader title={params.get("q")} subtitle={pageData != null ? getTotalSearchResults() : ""}>
                        <section>
                            <FontAwesomeIcon
                                onClick={handleResultsGrid}
                                icon={faList}
                                className={`mr-3 hidden sm:inline cursor-pointer ${
                                    resultsGrid == false ? "text-meliBlue" : "text-black text-opacity-20"
                                }`}
                            />
                            <FontAwesomeIcon
                                onClick={handleResultsGrid}
                                icon={faBorderAll}
                                className={`mr-6 hidden sm:inline cursor-pointer ${
                                    resultsGrid == true ? "text-meliBlue" : "text-black text-opacity-20"
                                }`}
                            />
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className="text-black text-opacity-20 cursor-pointer"
                            />
                        </section>
                    </ContentHeader>{" "}
                </>
            ) : (
                ""
            )}

            <section className="grid gap-5 grid-cols-1 px-4 mb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductList data={products}></ProductList>
                {/*  {products
                    ? products.map((product: Result) => (
                        <ProductItemCard data={product}></ProductItemCard>                          
                      ))
                    : ""} */}
            </section>
            
            
        </>
    );
};

export default SearchResults;
