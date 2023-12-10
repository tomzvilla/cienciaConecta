// hooks
import { useEffect, useState } from "react";
import usePagination, { DOTS } from "../../hooks/usePagination";
import PaginationButton from "./PaginationButton";

const Pagination = ({onPageChange, totalCount, currentPage, pageSize, siblingCount = 1}) => {

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })
    const [resize, setResize] = useState(window.innerWidth <= 800);

    const handleResize = () => {
        setResize(window.innerWidth <= 800);
      };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    if (currentPage === 0 || paginationRange.length < 2) {
        return null
    }

    const nextPage = () => {
        onPageChange(currentPage + 1)
    }
    const prevPage = () => {
        onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]
    
    return(
        <ul className="pagination">
            <PaginationButton onClick={prevPage} disabled={currentPage === 1} text={!resize ? "Anterior" : <img src={require("../../../assets/left-arrow.png")} alt="Anterior" className="pagination-button__img"/>}/>

            
        {!resize ? paginationRange.map(pageNumber => {
                if(pageNumber === DOTS) {
                    return (
                        <li className="pagination__dots" key={'dots'}>&#8230;</li>
                    )
                }
                return (

                    <PaginationButton key={pageNumber} clave={pageNumber} onClick={() => onPageChange(pageNumber)} text={pageNumber} current={pageNumber === currentPage }/>

                )
            }) : <PaginationButton key={currentPage} clave={currentPage} text={currentPage} current={false}/>
        
    }
            
            <PaginationButton onClick={nextPage} disabled={currentPage === lastPage} text={!resize ? "Siguiente" : <img src={require("../../../assets/right-arrow.png")} alt="Siguiente" className="pagination-button__img"/>}/>
        </ul>
    )
}

export default Pagination