import { Link } from "react-router-dom";
import ImageLink from "../ImageLink/ImageLink";

const TableBodyRow = (props) => {

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
                    <ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${item._id}`} src={require("../../../assets/ver.png")}/>
                    <ImageLink small={true} alt="Editar" linkto={`${props.editPath}/${item._id}`} src={require("../../../assets/edit.png")}/>
                  </td>
                </tr>
              )
            })
          
    )
}

export default TableBodyRow