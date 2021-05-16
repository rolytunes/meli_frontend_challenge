import { PathFromRoot } from "interfaces/ISearchResults";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight
} from "@fortawesome/free-solid-svg-icons";


const BreadcrumbItem = (props: any) => {
    let data: PathFromRoot = props.data;
    let chev: boolean = props.chev;
    return (
        <>
            <li className="breadcrumb-item mr-2">{data.name}</li>
            {chev ? (
                <li className="breadcrumb-chev mr-2">
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
            ) : (
                ""
            )}
        </>
    );
};
export default BreadcrumbItem;
