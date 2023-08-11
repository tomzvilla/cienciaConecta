const ModalHeader = (props) => {
    return (
        <div className="modal-header">
            <h5 className="modal-header__title">{props.title}</h5>
            <img className="modal-header__img" src={require("../../../assets/cancel.png")} alt=""  onClick={() => props.setIsOpen(false)}/>
        </div>
    )

}

export default ModalHeader