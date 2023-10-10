// components
import AutocompletePersonas from "../Autocomplete/AutocompletePersonas";
import ImageButton from "../ImageButton/ImageButton";
import Pagination from "../Pagination/Pagination";
import Button from "../Button/Button";
// hooks
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { referentesActions } from "../../../store/referentes-slice";
import Swal from "sweetalert2";
const pageSize = 1

const TablaReferentes = (props) => {
    // referentes state
    const referentesData = useSelector(state => state.referentes)
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const currentTableData = referentesData.referentes.slice(firstPageIndex, lastPageIndex);

    // autocomplete state

    const [results, setResults] = useState([])
    const [focusedInput, setFocusedInput] = useState(null)
    const [editing, setEditing] = useState(null)

    const handleFilter = (e) => {
        const searchTerm = e.target.value.trim();
        const notSelectedReferentes = props.usuarios.filter((usuario) => {
            return !referentesData.referentes.some((r) => usuario.cuil === r.referente.cuil);
        });
        const filteredValue = notSelectedReferentes.filter((usuario) => {
            const cuil = usuario.cuil
            return !searchTerm || cuil.includes(searchTerm)
        });
        setResults(filteredValue);
    };

    const handleFocus = (index) => {
        setFocusedInput(index)
        const notSelectedReferentes = props.usuarios.filter((usuario) => {
          return !referentesData.referentes.some((r) => usuario.cuil === r.referente.cuil);
        });
        setResults(notSelectedReferentes);
    };

    const handleBlur = () => {
        setFocusedInput(null)
        setEditing(null)
    };

    const handleSelect = (referente, sede) => {
        dispatch(referentesActions.actualizarReferente({
            sede: sede,
            referente: referente,
        }))
        setEditing(null)
        setFocusedInput(null)
    }

    const editarReferente = (index) => {
        if (editing === index) {
            // Clicking the same row again should toggle the editing state
            setEditing(null);
          } else {
            setEditing(index); // Set the current row's index as the one being edited
          }
        
    }

    const handleVolver = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        Swal.fire({
            title: '¿Deseas asignar los referentes a esas sedes?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Asignar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await asignarReferentes()
                if(success) Swal.fire({
                    title: '¡Referentes asignados!',
                    text: 'Asignaste los referentes con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#00ACE6',
                })     
            }
        })    
        
    }

    const asignarReferentes = async () => {
        try {
            const seleccion = referentesData.referentes.map(r => {
                return {
                    sede: r.sede._id,
                    referente: r.referente._id,
                }
            })
            await axiosPrivate.post('referente', JSON.stringify(seleccion), {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            return true

        } catch (err) {
            let msg = ''
            console.log(JSON.stringify(err.response.data))
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló la asignación <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Fallo la asignación',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    return (
        <>
            <table className="table">

                <thead className="table__header">
                    <tr>
                        {props.headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th className="table-header__head">Acciones</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {referentesData && currentTableData.map((referente, index) => {
                        return (
                            <tr key={referente.referente._id} className="table-body-row">
                                {props.headers.map(header => 
                                {
                                    if(header.value === 'referente') {
                                        return (
                                            <td key={header.value} className="table-body-row__td">
                                                { 
                                                    editing === index ? (
                                                        <AutocompletePersonas
                                                            name={referente.referente._id}
                                                            key={referente.referente._id}
                                                            results={results} 
                                                            onChange={handleFilter} 
                                                            onFocus={() => handleFocus(index)}
                                                            onBlur={handleBlur}
                                                            isFocused={focusedInput === index}
                                                            onSelect={(item) => handleSelect(item, referente.sede)}
                                                            renderItem={(item) => <p> {`${item.datos_docente.nombre} - ${item.cuil}`} </p>}
                                                        />
                                                    ) 
                                                    :
                                                    referente.referente === '' ?
                                                    (<div> - </div>)
                                                    :  (
                                                    <div>{`${referente.referente.datos_docente.nombre} - ${referente.referente.cuil}`}</div>)
                                                }
                                                
                                            </td>
                                        )
                                    } else {
                                        return ( <td key={header.name} className="table-body-row__td" >{referente.sede.nombre}</td>)
                                    }
                                       
                                }
                                )}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageButton callback={() => editarReferente(index)} small={true} alt="Editar" src={require("../../../assets/pencil.png")}/>
                                </td>
                                
                            </ tr>
                        )
                        
                    }
                    )}
                </tbody>
            </table>

            {<Pagination currentPage={currentPage} totalCount={referentesData.referentes.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />}
            <div className='register-project-form__button'>
                <Button text='Volver' onClickHandler={handleVolver}/>
                <Button text='Asignar' onClickHandler={handleSubmit} activo={true}/>
            </div>

        </>
    )
}

export default TablaReferentes