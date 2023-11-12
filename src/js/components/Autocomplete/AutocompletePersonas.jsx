import { useCallback, useEffect, useState } from "react"

const AutocompletePersonas  = (props) => {
    const {results, renderItem, onChange, onSelect, onFocus, disabled, value, isFocused} = props
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if(results && results.length > 0 && !showResults) {
            setShowResults(true) 
        }
        if(results && results.length <= 0) {
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
                <input name={props.name} disabled={disabled} className="autocomplete__input" type="text" onChange={onChange} onFocus={onFocus} value={value} placeholder= {"Ingresa un cuil..."}/>
                { showResults && isFocused && (<div className="autocomplete__container">
                    {results?.slice(0,150).map((item, index) => {
                        return ( 
                            <div 
                                onMouseDown={() => handleSelection(index)}
                                key={index}
                                className="autocomplete__auto"
                            >
                                {renderItem(item)}
                            </div>
                        )
                    })}
                </div>)}
            </div>
        
    )

}

export default AutocompletePersonas