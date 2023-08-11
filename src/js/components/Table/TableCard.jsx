import Table from "./Table";

const TableCard = (props) => {
    return (
        <div className="table-card">
            <h3 className="table-card__title">{props.title}</h3>
            <Table headers={props.headers} data={props.data} viewPath={props.viewPath} editPath={props.editPath}/>
        </div>

    )
}

export default TableCard;