// components
import SelectField from "../SelectField/SelectField"
import Table from "../Table/Table"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useSelector } from "react-redux"
const headers = [
    {name: 'Nivel', value: 'nombre'}
]

const PostulacionNiveles = (props) => {

    const {formValues, setFormValues, error, setError} = props

    const nivelesData = useSelector(state => state.niveles.niveles)
    const axiosPrivate = useAxiosPrivate()

    let niveles = [{_id: 0, nombre: "", codigo: '0'}, ...nivelesData]
    const { data: levelsData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, nivelesData.length !== 0)

    if(!loadingNiveles && nivelesData.length === 0){
        niveles = [{_id: 0, nombre: "", codigo: '0'}, ...levelsData.nivel].sort((level1, level2) => {
            if (level1.codigo < level2.codigo) {
              return -1; 
            } else if (level1.codigo > level2.codigo) {
              return 1;
            }
            return 0;
        });
    }

    const handleChange = (e) => {
        e.preventDefault()
        const nivelesElegidos = [...formValues.niveles]
        const nivelParaAgregar = niveles.find(lvl => lvl._id === e.target.value)
        if(!nivelParaAgregar) return
        if(nivelesElegidos.find(lvl => lvl._id === e.target.value)) {
            setError({
                error: true,
                msg: 'No podés seleccionar dos veces el mismo nivel'
            })
            return 
        } else setError({ error: false, msg: ''})
        nivelesElegidos.push(nivelParaAgregar)
        setFormValues({
            ...formValues,
            niveles: nivelesElegidos,
        })
    }

    const handleDelete = (e, item) => {
        e.preventDefault()
        const nivelesFiltrados = formValues.niveles.filter(lvl => lvl.nombre !== item.nombre)
        setFormValues({
            ...formValues,
            niveles: nivelesFiltrados,
        })
    } 
    return(
        <div className="postulacion-form">
            <h5 className="postulacion-form__title">Elegí los niveles que querés evaluar</h5>
            <Table data={formValues.niveles} headers={headers} callback={handleDelete}/>
            <div className="postulacion-form__input">
                <SelectField
                    label='Niveles: ' 
                    name='niveles'
                    dataValues={niveles}
                    onChange={handleChange}
                    onBlur={() => {}}
                    errors={null}
                    required={true}
                />
                {error.error && (<small className="postulacion-form__error"> {error.msg} </small>)}
            </div>
        </div>
    )
}

export default PostulacionNiveles