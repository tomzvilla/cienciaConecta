// Components
import ActionsGroup from "../../components/Table/ActionsGroup"

import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";

const Table = ({ headers, data, viewPath, editPath, callback}) => {

    return (
        <table className="table">
          <thead className="table__header">
            <TableHeader headers={headers}/>
          </thead>
          <tbody className="table__body">
              <TableBodyRow data={data} viewPath={viewPath} editPath={editPath} callback={callback} headers={headers}/>
          </tbody>

          
      </table>
    )

}


export default Table