

const BlankState = (props) => {
    const modifier = props.small ? "--small" : "";
    return (
        <div className="blank-state">
            <img className={`blank-state__img blank-state__img${modifier}`}src={require("../../../assets/blank.png")} alt="Blank State" />
            <h3 className="blank-state__text"> {props.msg} </h3>
        </div>
    )
}

export default BlankState