
interface IProps{
    full?: boolean
    text: string
}

const Empty = (props : IProps) => {
    const full: boolean = props.full ? true : false;
    return (
        <div className={`w-full h-full fixed block ${full ? "top-0" : "top-14"} left-0 bg-white z-50 flex flex-row items-center justify-items-center justify-center content-center`}>
            <span className="text-meliPrimary top-1/2">{props.text}</span>
        </div>
    );
};

export default Empty;
