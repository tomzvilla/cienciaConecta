// components
import Badge from "./Badge"



const PreviewBadge = (props) => {

    const defaultValue = {
        nombre: props?.data?.nombreCategoria !== '' ? props?.data?.nombreCategoria : 'Prueba Badge',
        abreviatura: props?.data?.abreviatura !== '' ? props?.data?.abreviatura : 'Prueba',
        color: props?.data?.color !== '#00ACE6' ? props?.data?.color : '#00ACE6'
    }

    return (
        <>
            <Badge className={'preview-badge'} type={defaultValue} />
        </>

    )

}

export default PreviewBadge