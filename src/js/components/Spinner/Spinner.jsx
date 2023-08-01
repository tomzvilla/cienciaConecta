import Lottie from "lottie-react";
import loadingSpinner from "../../../assets/loadingSpinner.json";

const Spinner = () => {
    return(
        <Lottie animationData={loadingSpinner} loop={true} autoplay={true} renderer="svg" style={{ height: 300 + 'px'}}/>
    )
}

export default Spinner