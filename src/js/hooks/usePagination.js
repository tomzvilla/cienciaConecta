import { useMemo } from "react"
export const DOTS = '...';

const usePagination = ({ totalCount, pageSize, currentPage, siblingCount = 1 }) => {

    const range = (start, end) => {
        const length = end - start + 1 

        return Array.from({ length }, (_, idx) => idx + start)
    }

    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(totalCount/pageSize)

        const totalPageNumbers = siblingCount + 4

        // Caso 1: numero de paginas es menor a la cantidad de paginas que hay que mostrar

        if(totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        // Calcular los indices del sibling izquierdo y derecho, y chequear el rango 

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)


        // No mostramos los puntos cuando solo hay un numero de pagina que tenga que ser insertado entre los siblings y los limites
        
        const shouldShowLeftDots = leftSiblingIndex > 1;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        // Caso 2, no hay puntos a la izquierda, pero si a la derecha

        if(!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 1 * siblingCount
            const leftRange = range(1, leftItemCount)
            
            return [...leftRange, DOTS, totalPageCount]
        }

        // Caso 3, no hay puntos a la derecha, pero si a la izquierda

        if(shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 1 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount, totalPageCount)
            
            return [firstPageIndex, DOTS, ...rightRange]
        }
        
        // Caso 4, hay que mostrar puntos a la izq y a la der.

        if(shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }



    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange

}

export default usePagination