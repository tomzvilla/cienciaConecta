

const BlankState = (props) => {
    return (
        <div className="blank-state">
            <img className="blank-state__img" src={require("../../../assets/blank.png")} alt="Blank State" />
            <h3 className="blank-state__text"> {props.msg} </h3>
        </div>
    )
}

export default BlankState