// Components
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";

const Table = ({ headers, data, viewPath, editPath, callback, modal, modalTitle}) => {

    return (
        <table className="table">
          <thead className="table__header">
            {modal ? 
            <TableHeader headers={headers} modal={true} modalTitle={modalTitle}/>:
            <TableHeader headers={headers}/>
          }
            
          </thead>

          {
            data ?  <tbody className="table__body">
            <TableBodyRow data={data} viewPath={viewPath} editPath={editPath} modal={modal} callback={callback} headers={headers} modalTitle={modalTitle}/>
        </tbody> : ""

          }

          


      </table>
    )

}


export default Table