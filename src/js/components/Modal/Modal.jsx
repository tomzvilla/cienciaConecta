import ModalCard from "./ModalCard"
import ModalHeader from "./ModalHeader"

const Modal = (props) => {
    return (
        <>
            <div className="modal" onClick={() => props.setIsOpen(false)} />
            <div>
                <ModalCard component={props.component} title={props.title} setIsOpen={props.setIsOpen}/>
            </div>
                
        </>
    )
}

export default Modal