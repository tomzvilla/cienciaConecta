import { useLocation, useNavigate } from "react-router";
import Card from "../components/Card/Card";
import CargarEstablecimientos from "../components/CargarEstablecimientos/CargarEstablecimientos";

import { useFormValidator } from "../hooks/useFormValidator";
import { useState } from "react";

import Swal from "sweetalert2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Establecimientos = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'
    const axiosPrivate = useAxiosPrivate()
    const [formValues, setFormValues] = useState({
        excel: '',
    })

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const cargarArchivo = async () => {
        try {

            const excel = new FormData()
            excel.append('establecimientosEducativos', formValues.excel)
    
            const response = await axiosPrivate.post('/establecimiento/actualizar', excel,
            {headers: {'Content-Type': 'multipart/form-data'}})

            return response.status === 200
        } catch(err) {
            console.log(err)
            let msg = ''
                if(!err?.response){
                    msg = 'El servidor no respondió'
                } else if(err.response?.status === 401) {
                    msg = 'No estas autorizado para cargar establecimientos.'
                } else if(err.response?.status === 400) {
                    msg = `Se produjo un error al cargar establecimientos. <br> ${err.response.data.error}`
                } else {
                    msg = `Falló la carga del archivo <br> ${err.response.data.error}`
                }
                Swal.fire({
                  html: msg,
                  title: 'Falló la carga de establecimientos',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#00ACE6',
                })
        }
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})
        if(!isValid) return 

        Swal.fire({
            title: '¿Estás seguro de que querés cargar este archivo?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Cargar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Volver',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await cargarArchivo()
                if(success) Swal.fire({
                    title: '¡Archivo cargado correctamente!',
                    text: 'El archivo que subiste se cargó correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
                    }
                })
            }
        })
    }


    return (
        <Card title="Cargar establecimientos">
            <CargarEstablecimientos formValues={formValues} setFormValues={setFormValues} errors={errors} validateForm={validateForm} onBlurField={onBlurField} handleSubmit={handleSubmit}/>
        </Card>
    );
}

export default Establecimientos;