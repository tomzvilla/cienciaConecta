import { Helmet } from "react-helmet-async"

const Metadata = (props) => {
    return (
        <Helmet>
            <title>CienciaConecta | {props.title} </title>
        </Helmet>
    )
}

export default Metadata
