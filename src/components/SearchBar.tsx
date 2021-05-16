import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ keyword, setKeyword }: { keyword: string; setKeyword: any }) => {
    //const history = useHistory();
    const BarStyling = { background: "#FFF", border: "none", padding: "0.5rem" };

    const [query, setQuery] = useState(keyword);

    const onSubmit = (e: any) => {
        /* history.push(`?q=${keyword}`); */
        //console.log(e);
        console.log(query);
        setKeyword(query);
        e.preventDefault();
    };

    return (
        <form className="flex-grow relative" action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
            <input
                className="box-shadow-default rounded-sm outline-none w-full"
                style={BarStyling}
                key="product_search"
                value={query}
                placeholder={"Nunca dejes de buscar"}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="absolute bg-gray-100 bottom-0 right-0" style={{ height: 37, width: 37 }}>
                <Link to={`/api/items?q=${query}`}>
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
            </button>
        </form>
    );
};

export default SearchBar;
