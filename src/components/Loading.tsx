import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = (props : any) => {
    const full: boolean = props.full ? true : false;
    return (
        <div className={`w-full h-full fixed block ${full ? "top-0" : "top-14"} left-0 bg-white z-50 flex flex-row items-center justify-items-center justify-center content-center`}>
            <span className="text-meliPrimary top-1/2">
                <FontAwesomeIcon icon={faSpinner} spin size="4x" />
            </span>
        </div>
    );
};

export default Loading;
