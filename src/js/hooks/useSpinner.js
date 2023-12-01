import Swal from "sweetalert2"
import Spinner from '../components/Spinner/Spinner'

const useSpinner= ({title}) => {

    const showSpinner = async (promise) => {
        const spinnerAlert = Swal.fire({
            title: title,
            html: Spinner,
            allowEscapeKey: false,
            allowOutsideClick: false,
            background: '#19191a',
            showConfirmButton: false, 
        });
        try {
            await promise;
        } catch (error) {
            console.error('Error during promise execution:', error);
        } finally {
            // Close the spinner alert when the promise is resolved or rejected
            Swal.close();
        }
    }

    return showSpinner
}

export default useSpinner;

