import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50 flex flex-row items-center justify-items-center justify-center content-center">
            <span className="text-meliPrimary top-1/2">
                <FontAwesomeIcon icon={faSpinner} spin size="4x" />
            </span>
        </div>
    );
};

export default Loading;
