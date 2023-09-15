// components
import SelectField from "../SelectField/SelectField"
import Table from "../Table/Table"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const headers = [
    {name: 'Categoría', value: 'nombre'}
]

const PostulacionCategorias = (props) => {

    const {formValues, setFormValues, error, setError} = props

    const axiosPrivate = useAxiosPrivate()

    let categories = []
    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    if(categoriesData){
        categories = [{_id: 0, nombre: ""}, ...categoriesData.categoria]
    }

    const handleChange = (e) => {
        e.preventDefault()
        const categoriasElegidas = [...formValues.categorias]
        const categoriaParaAgregar = categories.find(cat => cat._id === e.target.value)
        if(!categoriaParaAgregar) return
        if(categoriasElegidas.find(cat => cat._id === e.target.value)) {
            setError({
                error: true,
                msg: 'No podés seleccionar dos veces la misma categoría'
            })
            return 
        } else setError({ error: false, msg: ''})
        categoriasElegidas.push(categoriaParaAgregar)
        setFormValues({
            ...formValues,
            categorias: categoriasElegidas,
        })
    }

    const handleDelete = (e, item) => {
        e.preventDefault()
        const categoriasFiltradas = formValues.categorias.filter(cat => cat.nombre !== item.nombre)
        setFormValues({
            ...formValues,
            categorias: categoriasFiltradas,
        })
    } 
    return(
        <div className="postulacion-form">
            <h5 className="postulacion-form__title">Elegí las categorías que querés evaluar</h5>
            <Table data={formValues.categorias} headers={headers} callback={handleDelete}/>
            <div className="postulacion-form__input">
                <SelectField
                    label='Categorías: ' 
                    name='categorias'
                    dataValues={categories}
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

export default PostulacionCategorias