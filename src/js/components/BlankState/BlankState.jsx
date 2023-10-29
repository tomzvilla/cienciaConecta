import Lottie from "lottie-react";
import errorSpinner from "../../../assets/errorSpinner.json";

const BlankState = (props) => {
    return (
        <div className="blank-state">
            {/* <img className="blank-state__img" src={require("../../../assets/blank.png")} alt="Blank State" /> */}
            <Lottie animationData={errorSpinner} loop={false} autoplay={true} renderer="svg" style={{ height: 300 + 'px'}}/>
            <h3 className="blank-state__text"> {props.msg} </h3>
        </div>
    )
}

export default BlankState