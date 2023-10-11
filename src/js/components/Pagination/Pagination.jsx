// hooks
import usePagination, { DOTS } from "../../hooks/usePagination";
import PaginationButton from "./PaginationButton";

const Pagination = ({onPageChange, totalCount, currentPage, pageSize, siblingCount = 1}) => {

    const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })

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
            <PaginationButton onClick={prevPage} disabled={currentPage === 1} text="Anterior"/>

            {paginationRange.map(pageNumber => {
                if(pageNumber === DOTS) {
                    return (
                        <li className="pagination__dots" key={'dots'}>&#8230;</li>
                    )
                }
                return (
                    <PaginationButton clave={pageNumber} onClick={() => onPageChange(pageNumber)} text={pageNumber} current={pageNumber === currentPage }/>
                )
            })}
            <PaginationButton onClick={nextPage} disabled={currentPage === lastPage} text="Siguiente"/>
        </ul>
    )
}

export default Pagination