import { ISearchResults } from "interfaces/ISearchResults";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";

/* const buildBreadCrumbs = () => {
    var data: IProductDetails = pageData;
}; */

const Breadcrumb = (props: any) => {
    //let children = React.Children.toArray(props.children);
    let data: ISearchResults = props.data;
    let numberItems: number = data.filters ? data.filters[0].values[0].path_from_root.length : 0;

    const children = data.filters ? data.filters[0].values[0].path_from_root.map((child, index) => (
        <BreadcrumbItem
            key={`breadcrumb_item${index}`}
            data={child}
            chev={numberItems != index + 1 ? true : false}
        ></BreadcrumbItem>
    )) : "";
    
    return (
        <nav className="px-4 text-xs text-gray-500 text-opacity-60 mt-2">
            <ul className="flex flex-row">{children}</ul>
        </nav>
    );
};

export default Breadcrumb;
