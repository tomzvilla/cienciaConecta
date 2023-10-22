// components
import InputField from "../InputField/InputField"
import Button from "../Button/Button"
import PreviewBadge from "../Badge/PreviewBadge"
// hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useDispatch, useSelector } from "react-redux"
import { categoriasActions } from "../../../store/categorias-slice"

import Swal from "sweetalert2"

const CrearCategorias = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const categorias = useSelector(state => state.categorias.categorias)

    const [categoria, setCategoria] = useState({
        nombreCategoria: '',
        abreviatura: '',
        color: '#00ACE6',
    })

    const {errors, validateForm, onBlurField} = useFormValidator(categoria)

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextCategoria = {
            ...categoria,
            [name]: value
        }
        if (errors[name].dirty) {
            validateForm({form: nextCategoria, errors, name})
        }
        setCategoria(nextCategoria)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { isValid } = validateForm({form: categoria, errors, forceTouchErrors: true})

        if(!isValid) return

        if(categorias.some(c => c.nombre === categoria.nombreCategoria)) {
            Swal.fire({
                title: 'No puedes agregar dos veces la misma categoría',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }

        Swal.fire({
            title: '¿Deseas agregar una nueva categoría?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Agregar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await agregarCategoria()
                if(success) {
                    dispatch(categoriasActions.agregarCategoria(
                        {
                            _id: Math.random(),
                            nombre: categoria.nombreCategoria,
                            abreviatura: categoria.abreviatura,
                            color: categoria.color
                        }
                    ))
                    Swal.fire({
                        title: '¡Categoría Agregada!',
                        text: 'Agregaste una categoría con éxito',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    }).then(result => {
                        if(result.isConfirmed || result.isDismissed) {
                            setCategoria({
                                nombreCategoria: '',
                                abreviatura: '',
                                color: '#00ACE6',
                            })
                        }
                    })
                }
            }
        })
    }

    const agregarCategoria = async () => {
        try {
            const body = {
                nombre: categoria.nombreCategoria,
                abreviatura: categoria.abreviatura,
                color: categoria.color,
            }
            const res = await axiosPrivate.post(`categoria`, JSON.stringify(body),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return res.status === 200

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
                msg = `Falló la creación de la categoría <br> ${err.response?.data?.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la creación de la categoría',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })

        }
    }

    return (
        <form className="datos-feria-form">
            <h3>Nueva categoría</h3>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Nombre: ' 
                    name='nombreCategoria'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={categoria.nombreCategoria}
                    errors={errors.nombreCategoria}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Abreviatura: ' 
                    name='abreviatura'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={categoria.abreviatura}
                    errors={errors.abreviatura}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Color: ' 
                    name='color'
                    type='color'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={categoria.color}
                    errors={errors.color}
                    required={true}
                />
            </div>
            <div>
                <PreviewBadge data={categoria}/>
            </div>
            <div>
                <Button
                    text={'Agregar'}
                    activo={true}
                    onClickHandler={handleSubmit}
                />
            </div>

        </form>
    )

}

export default CrearCategorias