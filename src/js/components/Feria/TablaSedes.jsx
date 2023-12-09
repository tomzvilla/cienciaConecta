// components
import InputField from "../InputField/InputField"
import ImageButton from "../ImageButton/ImageButton"
import Pagination from "../Pagination/Pagination"
// hooks
import { useState, useEffect } from "react"

const pageSize = 5

const TablaSedes = ({ headers, sedes, handleDelete, handleChangeCupos, prevCupos }) => {
// referentes state
    const [cupos, setCupos] = useState(prevCupos ?? [])
    console.log(cupos)
    console.log(prevCupos)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return sedes?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    // Init cupos

    useEffect(() => {
        sedes.forEach(sede => {
            if(!cupos?.find(c => c.sede === sede._id)) {
                prevCupos?.push({
                    sede: sede._id,
                    cantidad: 0,
                })
            }
        })
        setCupos(prevCupos ?? [])
    }, [])
    
    // autocomplete state

    const [editing, setEditing] = useState(null)

    const handlePageChange = (page) => {
        setEditing(null)
        setCurrentPage(page)
    }


    const editarSede = (index) => {
        if (editing === index) {
            setEditing(null);
        } else {
            setEditing(index);
        } 
    }

    const isPositiveInteger = (num) => {
        return /^[0-9]\d*$/.test(num)
    }
    
    const changeCupos = (e) => {
        let { name, value } = e.target
        const newCupos = [...cupos]
  
        if (value.trim() !== '' && !isPositiveInteger(value)) return

        const index = cupos?.findIndex(c => c.sede === name)
        const valor = value.trim() === '' ? '' : parseInt(value)
        if(index === -1) {
            newCupos?.push({sede: name, cantidad: valor})
        } else {
            newCupos[index].cantidad = value
        }
        
        setCupos(newCupos)

        handleChangeCupos({sede: name, cantidad: valor})
    }

    return (
        <>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        {headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th className="table-header__head">Acciones</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {sedes && currentTableData.map((sede, index) => {
                        return (
                            <tr key={index} className="table-body-row">
                                {headers.map(header => 
                                {
                                    if(header.value === 'cupos') {
                                        return (
                                            <td key={header.value} className="table-body-row__td table-body-row__td--autocomplete-cupos">
                                                { 
                                                    editing === index ? (
                                                        <InputField
                                                            label={''} 
                                                            name={sede._id} 
                                                            type='number'
                                                            onChange={changeCupos}
                                                            onBlur={() => {}}
                                                            value={cupos?.find(cupo => cupo.sede === sede._id)?.cantidad}
                                                            errors={null}
                                                        />
                                                    ) 
                                                    :
                                                    !cupos?.find(cupo => cupo.sede === sede._id) ?
                                                    (<div> - </div>)
                                                    :  (
                                                    <div>{cupos?.find(cupo => cupo.sede === sede._id).cantidad}</div>)
                                                }
                                            </td>
                                        )
                                    } else return (<td key={header.name} className="table-body-row__td" >{sede[`${header?.value}`]}</td>)
                                }
                                )}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageButton callback={() => editarSede(index)} small={true} alt="Editar" src={require("../../../assets/pencil.png")}/>
                                    <ImageButton callback={(e) => handleDelete(e, sede)} small={true} alt="Borrar" src={require("../../../assets/x.png")}/>
                                </td>           
                            </ tr>
                        ) 
                    }
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={sedes.length} pageSize={pageSize} onPageChange={page => handlePageChange(page)} />
        </>
    )


}

export default TablaSedes