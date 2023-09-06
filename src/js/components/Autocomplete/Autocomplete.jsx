import { useCallback, useEffect, useState } from "react"

const Autocomplete  = (props) => {
    const {results, renderItem, onChange, onSelect, onFocus, disabled, value} = props
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
        
            <div onBlur={resetSearchComplete} className="autocomplete">
                <label className="autocomplete__label">Establecimiento: </label>
                <input disabled={disabled} className="autocomplete__input" type="text" onChange={onChange} onFocus={onFocus} value={value} placeholder= {"Ingresa un establecimiento..."}/>
                { showResults && (<div className="autocomplete__container">
                    {results?.map((item, index) => {
                        if (index < 150) {
                        return ( 
                            <div 
                                onMouseDown={() => handleSelection(index)}
                                key={index}
                                className="autocomplete__auto"
                            >
                                {renderItem(item)}
                            </div>
                        )
                    }})}
                </div>)}
            </div>
        
    )

}

export default Autocomplete