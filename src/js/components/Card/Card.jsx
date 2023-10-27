// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import CardHeader from "./CardHeader";

const Card = (props) => {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const delay = setTimeout(() => {
          setAnimate(true);
        }, 30);
    
        return () => clearTimeout(delay);
      }, []);

    return (

        
          props.header ? 

          <div className={`card card--${animate ? 'animate' : ''} card--${props.wide ? 'wide' : ''}`}>
            {props.header}
            {props.children}
          </div>

            :

          <div className={`card card--${animate ? 'animate' : ''} card--${props.wide ? 'wide' : ''}`}>
            <CardHeader title={props.title} wide={props.wide} goBack={props.goBack}/>
            {props.children}
          </div>


        

        
    );
}

export default Card;