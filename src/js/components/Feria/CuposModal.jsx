// hooks
import { useState } from "react"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
// components
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
const CuposModal = (props) => {
    const {getSede, confirmarCupo, getCupos} = props
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
    const nivelesSede = sede.niveles
    niveles.forEach((nivel, i) => {
        if (!nivelesSede.inicial) {
            if (nivel.codigo === "1") delete niveles[i]
        }

        if (!nivelesSede.primario) {
            if (nivel.codigo === "2") delete niveles[i]
            if (nivel.codigo === "3") delete niveles[i]
            
        }

        if (!nivelesSede.secundario) {
            if (nivel.codigo === "4") delete niveles[i]
            if (nivel.codigo === "5") delete niveles[i]
        }

        if (!nivelesSede.terciario) {
            if (nivel.codigo === "6") delete niveles[i]
            if (nivel.codigo === "7") delete niveles[i]
        }
    })

    //console.log(niveles)

    const generarNiveles = () => {
        const prevCupos = []
        niveles.forEach((nivel) => {
            if(nivel._id !== 0 && !prevCupos[nivel._id]) prevCupos[nivel._id] = '0'
        })

        

        setCupos(prevCupos)
    }

    const handleChange = (e) => {
        let {name, value} = e.target
        const prevCupos = {...cupos}
        if(parseInt(value) <= 0) value = Math.abs(value)
        // cargar todos los niveles 
        generarNiveles()
        // on change handler
        prevCupos[name] = Math.abs(value)
        setCupos(prevCupos)
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
        <div className="cupos-modal">
            {niveles && niveles.map((nivel) => 
                nivel._id !== 0 ? (
                    <div key={nivel._id} className="cupos-modal__nivel"> 
                        <InputField
                            key={nivel._id}
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
                ) : ""
            )}
            <div className="cupos-modal__button">
                <Button 
                    text={'Confirmar'} 
                    onClickHandler={handleConfirmarCupos} activo={true}
                />
            </div>
        </div>
    )    
}

export default CuposModal