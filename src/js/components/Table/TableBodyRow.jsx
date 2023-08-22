import { Link } from "react-router-dom";
import ImageLink from "../ImageLink/ImageLink";
import ImageButton from "../ImageButton/ImageButton";
import Button from "../Button/Button";

// Recibe un viewPath y un editPath para editar y ver proyectos en la lista de proyectos
// Polimorficamente si no recibe estos path, y recibe un callback, muesta un icono x

const TableBodyRow = (props) => {

  const showBorrar = props.callback ? true : false;
  const showModal = props.modal ? true : false;

    return (
        
            props.data.map((item, index) => {
              return (
                <tr key={item._id} className="table-body-row">
                  {
                    props.headers.map((header, index) =>{
                      return (<td key={index} className="table-body-row__td" >{item[`${header?.value}`]}</td> )
                    })
                  }

                  {showBorrar & showModal ?
                        <>
                            <td key={index} className="table-body-row__td">
                              <Button activo={true} text={props.modalTitle} onClickHandler={props.modal} small={true}/>
                            </td>

                            <td key={index+1} className="table-body-row__td">
                              <ImageButton small={true} alt="Borrar" linkto={""} callback={props.callback} src={require("../../../assets/x.png")}/>
                            </td>
                        </>
                    : 
                    
                    
                    <td key={index} className="table-body-row__td table-body-row__td--actions">
                    {
                      showBorrar ? 
                      <ImageButton small={true} alt="Borrar" linkto={""} callback={props.callback} src={require("../../../assets/x.png")}/>
                      :
                    <>
                      <ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${item._id}`} src={require("../../../assets/ver.png")}/>
                      <ImageLink small={true} alt="Editar" linkto={`${props.editPath}/${item._id}`} src={require("../../../assets/edit.png")}/>
                    </>     
                    }

                  </td>
                }

                  
                </tr>
              )
            })
          
    )
}

export default TableBodyRow