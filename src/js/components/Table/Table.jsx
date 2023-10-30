// Components
import TableHeader from "./TableHeader";
import TableBodyRow from "./TableBodyRow";

const Table = ({ headers, data, viewPath, editPath, callback, modal, modalTitle, acciones=true}) => {

    return (
        <table className="table">
          <thead className="table__header">
            {modal ? 
            <TableHeader headers={headers} modal={true} modalTitle={modalTitle}/>:
            <TableHeader headers={headers} acciones={acciones}/>
          }
            
          </thead>

          {
            data ?  <tbody className="table__body">
            <TableBodyRow data={data} viewPath={viewPath} editPath={editPath} modal={modal} callback={callback} headers={headers} modalTitle={modalTitle} acciones={acciones}/>
        </tbody> : ""

          }

          


      </table>
    )

}


export default Table