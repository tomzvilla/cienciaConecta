// Components
import ActionsGroup from "../../components/Table/ActionsGroup"
import { Link } from "react-router-dom";

const Table = ({ headers, data, viewPath, editPath}) => {

    return (
        <table className="table">
          <thead className="headBg">
            <tr>
              {headers.map(header => {
                return (
                  <th scope="col" key={header.value}>
                    {header.name}
                  </th>
                );
              })}
              <th colSpan={2}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item._id}>
                  {
                    headers.map((header, index) =>{
                      return (<td key={index}>{item[`${header.value}`]}</td> )
                    })
                  }
                  <td key={index}>
                    <button>
                        <Link to={`${viewPath}/${item._id}`}> Ver </Link>
                    </button>
                    <button>
                        <Link to={`${editPath}/${item._id}`}> Editar </Link> 
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
      </table>
    )

}


export default Table