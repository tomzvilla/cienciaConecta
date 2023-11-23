import Lottie from "lottie-react";
import errorSpinner from "../../../assets/errorSpinner.json";
import { useEffect, useState } from "react";

const BlankState = (props) => {
    const [resize, setResize] = useState(window.innerWidth <= 800);

    const handleResize = () => {
        setResize(window.innerWidth <= 800);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="blank-state">
            <Lottie 
                animationData={errorSpinner} 
                loop={false} 
                autoplay={true} 
                renderer="svg" 
                style={!resize ? { height: 300 + 'px'} : { height: 200 + 'px'}}
            />
            <h3 className="blank-state__text"> {props.msg} </h3>
        </div>
    )
}

export default BlankState