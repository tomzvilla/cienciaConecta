// Components
import ActionsGroup from "../../components/Table/ActionsGroup"
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";

const Table = ({ headers, data, viewPath, editPath, callback, cupos}) => {

    return (
        <table className="table">
          <thead className="table__header">
            {cupos ? 
            <TableHeader headers={headers} cupos={true}/>:
            <TableHeader headers={headers}/>
          }
            
          </thead>
          <tbody className="table__body">
              <TableBodyRow data={data} viewPath={viewPath} editPath={editPath} cupos={cupos} callback={callback} headers={headers}/>
          </tbody>


      </table>
    )

}


export default Table