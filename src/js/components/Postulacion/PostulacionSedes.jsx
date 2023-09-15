// components
import SelectField from "../SelectField/SelectField"
import Table from "../Table/Table"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const headers = [
    {name: 'Sedes', value: 'nombre'},
    {name: 'CUE', value: 'cue'},
]

const PostulacionSedes = (props) => {

    const {formValues, setFormValues, error, setError} = props

    const axiosPrivate = useAxiosPrivate()
    const { data: sedesData} = useAxiosFetch('/establecimiento/sedes/regional', axiosPrivate)
    let sedes = []
    if(sedesData){
        sedes = [{_id: 0, nombre: ""}, ...sedesData.sedes].sort((sede1, sede2) => {
            if (sede1.nombre < sede2.nombre) {
              return -1; 
            } else if (sede1.nombre > sede2.nombre) {
              return 1;
            }
            return 0;
        });
    }

    const handleChange = (e) => {
        e.preventDefault()
        const sedeParaAgregar = sedes.find(sede => sede._id === e.target.value)
        if(!sedeParaAgregar) return
        setFormValues({
            ...formValues,
            sede: [sedeParaAgregar],
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        setFormValues({
            ...formValues,
            sede: [],
        })
    } 

    return(
        <div className="postulacion-form">
            <h5 className="postulacion-form__title">Elegí la sede donde querés evaluar</h5>
            <Table data={formValues.sede} headers={headers} callback={handleDelete}/>
            <div className="postulacion-form__input">
                <SelectField
                    label='Sedes: ' 
                    name='sedes'
                    dataValues={sedes}
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

export default PostulacionSedes