// hooks
import { useState } from "react"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
// components
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
const CuposModal = (props) => {
    const {getSede, cerrarModal, confirmarCupo, getCupos} = props
    const axiosPrivate = useAxiosPrivate()
    const sede = getSede()
    const cuposData = getCupos(sede._id)
    const [cupos, setCupos] = useState(cuposData)
    
    // verifica si ya existen cupos para la sede

    // Cargar niveles
    
    let niveles = []
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)
    if(levelsData){
        niveles = [{_id: 0, nombre: "", codigo: '0'}, ...levelsData.nivel].sort((level1, level2) => {
            if (level1.codigo < level2.codigo) {
              return -1; 
            } else if (level1.codigo > level2.codigo) {
              return 1;
            }
            return 0;
          });
    }

    const generarNiveles = () => {
        const prevCupos = []
        niveles.forEach((nivel) => {
            if(nivel._id !== 0 && !prevCupos[nivel._id]) prevCupos[nivel._id] = '0'
        })
        setCupos(prevCupos)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        const prevCupos = {...cupos}
        // cargar todos los niveles 
        generarNiveles()
        // on change handler
        prevCupos[name] = value
        setCupos(prevCupos)
    }

    const handleCancelar = (e) => {
        e.preventDefault()
        setCupos([])
        cerrarModal()
    }

    const handleConfirmarCupos = (e) => {
        e.preventDefault()
        if(cupos.length !== niveles.length) generarNiveles()
        const cuposSede = [];

        for (const categoria in cupos) {
            if (cupos.hasOwnProperty(categoria)) {
                let cant = cupos[categoria]
                if(cupos[categoria] === "") cant = 0
                cuposSede.push({
                    sede: sede._id,
                    nivel: categoria,
                    cantidad: cant,
                });
            }
        }
        setCupos([])
        confirmarCupo(cuposSede)
    
    }


    return (
        <div>
            <h1>Cupos</h1>
            {niveles && niveles.map((nivel) => {
                if(nivel._id !== 0)
                    return (
                        <div key={nivel._id}> 
                            <InputField
                                label={nivel.nombre} 
                                name={nivel._id} 
                                type='number'
                                onChange={handleChange}
                                onBlur={() => {}}
                                value={
                                    cupos.length === 0 ? 0 : cupos[nivel._id]
                                }
                                errors={null}
                                required={true}
                            />
                        </div>
                    )
                })
            }
            <div className='edit-project-form__button'>
                <Button 
                    text='Cancelar' 
                    onClickHandler={handleCancelar}
                />
                <Button 
                    text={'Confirmar'} 
                    onClickHandler={handleConfirmarCupos} activo={true}
                />
            </div>
        </div>
    )    
}

export default CuposModal