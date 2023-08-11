import { Link } from "react-router-dom";
import ImageLink from "../ImageLink/ImageLink";
import ImageButton from "../ImageButton/ImageButton";

// Recibe un viewPath y un editPath para editar y ver proyectos en la lista de proyectos
// Polimorficamente si no recibe estos path, y recibe un callback, muesta un icono x

const TableBodyRow = (props) => {

  const borrar = props.callback ? true : false;

    return (
        
            props.data.map((item, index) => {
              return (
                <tr key={item._id} className="table-body-row">
                  {
                    props.headers.map((header, index) =>{
                      return (<td key={index} className="table-body-row__td" >{item[`${header.value}`]}</td> )
                    })
                  }
                  <td key={index} className="table-body-row__td table-body-row__td--actions">
                    {
                      borrar ?

                      <ImageButton small={true} alt="Borrar" linkto={""} callback={props.callback} src={require("../../../assets/x.png")}/>

                      :
                    <>
                      <ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${item._id}`} src={require("../../../assets/ver.png")}/>
                      <ImageLink small={true} alt="Editar" linkto={`${props.editPath}/${item._id}`} src={require("../../../assets/edit.png")}/>
                    </>     
                    }

                  </td>
                </tr>
              )
            })
          
    )
}

export default TableBodyRow