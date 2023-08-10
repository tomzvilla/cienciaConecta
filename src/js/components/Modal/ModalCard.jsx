import ModalHeader from "./ModalHeader"

const ModalCard = (props) => {
    return (
        <div className="modal-card">
            <ModalHeader title={props.title} setIsOpen={props.setIsOpen}/>
            {props.component}
        </div>
    )
}

export default ModalCard