import { Result } from "interfaces/ISearchResults";
import { Link } from "react-router-dom";

const ProductItemCard = (props: any) => {
    let product: Result = props.data;

    const renderListingType = () => {
        let type: string = "";
        switch(product.listing_type_id){
            case "gold_special":
                type = "GOLD SPECIAL";
                break;
            case "gold_pro":
                type = "GOLD PRO";
                break;
            default:
                type = "";
        }
        return type ? <span className="bg-meliGreen text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded">{type}</span> : "";
    }

    return (
        <Link
            to={`/api/items/${product.id}`}
            key={product.id}
            className={`product_item p-5 bg-white shadow-sm rounded-md flex justify-items-stretch items-stretch`}
        >
            <article className="grid grid-cols-3 grid-rows-1 md:grid-cols-1 md:grid-rows-3 gap-y-4 w-full relative">
            {/* {renderListingType()} */}
                <div className="md:row-span-2 flex items-center justify-center">
                    <img className="object-contain h-48" src={product.thumbnail} alt="" />
                </div>
                <section className="col-span-2 pl-5">
                    {/* <hr className="hidden md:block"></hr> */}
                    <del
                        className={`text-gray-400 text-sm ${
                            product.price != product.original_price && product.original_price ? "" : "invisible"
                        }`}
                    >
                        <span className="mr-1">{product.currency_id}</span>
                        <span>{product.original_price}</span>
                    </del>
                    <div className="flex flex-row">
                        <p className="text-lg mb-3">
                            <span className="mr-2">{product.currency_id}</span>
                            {product.price}
                            {product.price !== product.original_price && product.original_price ? (
                                <span className="ml-2 text-sm text-meliGreen">
                                    {Math.round(
                                        ((product.original_price - product.price) / product.price) * 100
                                    ).toString()}
                                    % OFF
                                </span>
                            ) : (
                                ""
                            )}
                        </p>
                    </div>

                    <p>{product.title}</p>
                </section>
            </article>
        </Link>
    );
};

export default ProductItemCard;
