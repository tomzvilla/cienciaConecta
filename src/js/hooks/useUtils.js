const useUtils = () => {
    const formatCuil = (input) => {
        // Eliminar todos los caracteres no numéricos
        const numericInput = input.replace(/\D/g, '');
    
        // Aplicar el formato con guiones
        if (numericInput.length <= 2) {
            return numericInput;
        } else if (numericInput.length <= 10) {
            return `${numericInput.slice(0, 2)}-${numericInput.slice(2)}`;
        } else {
            return `${numericInput.slice(0, 2)}-${numericInput.slice(2, 10)}-${numericInput.slice(10, 11)}`;
        }
    };



    return { formatCuil }

}

export default useUtils