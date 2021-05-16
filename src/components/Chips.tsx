interface IProps {
    title: string;
    children?: React.ReactNode;
    color?: string;
}

const Chips = (props: IProps) => {
    let bgColor: string = props.color ? props.color : "bg-meliGreen";
    return (
        <div className={`flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-white ${bgColor}`}>
            <div className="text-xs font-normal leading-none max-w-full flex-initial">{props.title}</div>
        </div>
    );
};

export default Chips;
