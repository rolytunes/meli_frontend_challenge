import React from "react";

const ContentHeader = (props: any) => {

    let title: string = props.title.charAt(0).toUpperCase() + props.title.slice(1);
    let subtitle: string = props.subtitle;
    let children = React.Children.toArray(props.children);

    return (
        <>
            <header className="flex flex-row px-4 mt-2 items-end justify-between">
                <p className="text-xl">
                    <strong>{title}</strong>
                    {subtitle ? <span className="text-sm ml-2 text-black text-opacity-50">{subtitle}</span> : ""}
                </p>
                <section>{children}</section>
            </header>
            <hr className="m-4 border-gray-100"></hr>
        </>
    );
};

export default ContentHeader;
