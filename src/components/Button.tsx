import React from "react";

interface Props {
    //border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    radius: string;
    width: string;
}

const MeliButton = ({ children, onClick} : any) => {
    return (
        <button
            className="border-0 bg-meliBlue w-full py-3 px-3 rounded-md text-white hover:bg-meliBlue focus:outline-none transition uppercase transition ease-in duration-200"
            onClick={onClick}
            /* style={{
                backgroundColor: color ? color : "bg-meliBlue",
                borderRadius: radius ? radius : ,
                height,
                width,
            }} */
        >
            {children}
        </button>
    );
};

export default MeliButton;
