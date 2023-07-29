// Components
import ActionsGroup from "../../components/Table/ActionsGroup"

const Table = ({ headers, data}) => {

    console.log(headers)
    console.log(data)

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
                  <ActionsGroup />
                </tr>
              )
            })}
          </tbody>
      </table>
    )

}


export default Table