import { useCallback, useEffect, useState } from "react"

const Autocomplete  = (props) => {
    const {results, renderItem, onChange, onSelect, onFocus, disabled} = props
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if(results.length > 0 && !showResults) {
            setShowResults(true) 
        }
        if(results.length <= 0) {
            setShowResults(false)
        }
    }, [results])

    const handleSelection = (selectedIndex) => {
        const selectedItem = results[selectedIndex]
        if(!selectedItem) return resetSearchComplete()
        onSelect && onSelect(selectedItem)
        resetSearchComplete()

    }

    const resetSearchComplete = useCallback(() => {
        setShowResults(false)
    }, [])
    
    return (
        <div>
            <div onBlur={resetSearchComplete}>
                <input disabled={disabled} type="text" onChange={onChange} onFocus={onFocus} placeholder="Ingresa un establecimiento..."/>
                { showResults && (<div>
                    {results?.map((item, index) => {
                        if (index < 150) {
                        return ( 
                            <div 
                                onMouseDown={() => handleSelection(index)}
                                key={index}
                            >
                                {renderItem(item)}
                            </div>
                        )
                    }})}
                </div>)}
            </div>
        </div>
    )

}

export default Autocomplete