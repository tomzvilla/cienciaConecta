// hooks
import usePagination, { DOTS } from "../../hooks/usePagination";

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
        <ul>
            <li> <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button></li>
            {paginationRange.map(pageNumber => {
                if(pageNumber === DOTS) {
                    return (
                        <li key={'dots'}>&#8230;</li>
                    )
                }
                return (
                    <li key={pageNumber}>
                        <button className={pageNumber === currentPage ? "active" : ""} onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
                    </li>
                )
            })}
            <li> <button onClick={nextPage} disabled={currentPage === lastPage}>Siguiente</button></li>
        </ul>
    )
}

export default Pagination