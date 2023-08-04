const TableHeader = (props) => {

    return (
        <tr className="table-header">
              {props.headers.map(header => {
                return (
                  <th scope="col" key={header.value} className="table-header__head">
                    {header.name}
                  </th>
                );
              })}
              <th colSpan={2} className="table-header__head">
                Acciones
              </th>
        </tr>
    )
}

export default TableHeader