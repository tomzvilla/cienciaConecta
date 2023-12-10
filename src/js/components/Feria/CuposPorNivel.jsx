// components
import InputField from "../InputField/InputField"
import Spinner from "../Spinner/Spinner"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useSelector } from "react-redux"

const CuposPorNivel = (props) => {
    const { setFormValues, formValues } = props
    const axiosPrivate = useAxiosPrivate()

    const nivelesState = useSelector(state => state.niveles.niveles)
    
    // Cargar niveles
    
    let niveles = [{_id: 0, nombre: "", codigo: '0'}, ...nivelesState]

    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, nivelesState.length !== 0)

    const { niveles: nivelesMappeados } = useCategoriasNiveles({ categoriaData: null, nivelData: nivelesData, enabled: !loadingNiveles })

    niveles = nivelesState.length === 0 ? nivelesMappeados : nivelesState

    const handleChangeCupos = (e) => {
        e.preventDefault()
        let {name, value} = e.target
        if(parseInt(value) <= 0) value = Math.abs(value)
        const prevCupos = formValues.cupos?.porNivel ? [...formValues.cupos.porNivel] : []
        const existingIndex = prevCupos.findIndex(c1 => c1.nivel === name);
        if (existingIndex !== -1) {
            prevCupos[existingIndex].cantidad = Math.abs(value);
        } else {
            prevCupos.push({
                nivel: name,
                cantidad: Math.abs(value)
            });
        }
        setFormValues({
            ...formValues,
            cupos: {
                ...formValues.cupos,
                porNivel: prevCupos
            }
        })
    }

    const loading = nivelesState.length !== 0 ? false : loadingNiveles

    return (
            (loading) ?
            <Spinner />
            :
            (<div className="cupos-modal">   
                <h2 className='cupos-modal__title'>Cupos por Nivel Regionales </h2>
                {niveles && niveles.map((nivel) =>
                    nivel._id !== 0 ? (
                        <div key={nivel._id} className="cupos-modal__nivel"> 
                            <InputField
                                key={nivel._id}
                                label={nivel.nombre} 
                                name={nivel._id} 
                                type='number'
                                onChange={handleChangeCupos}
                                onBlur={() => {}}
                                value={
                                    formValues.cupos?.porNivel?.find(cupo => cupo.nivel === nivel._id)?.cantidad || ""
                                }
                                errors={null}
                                required={true}
                            />
                        </div>
                    ) : ""
                )}
            </div>)
    )   
    
}

export default CuposPorNivel