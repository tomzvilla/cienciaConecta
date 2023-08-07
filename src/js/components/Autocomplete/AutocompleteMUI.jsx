import useAutocomplete from '@mui/base/useAutocomplete';

const AutocompleteMUI  = () => {
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
      } = useAutocomplete({
        options: [
          { label: 'Monserrat', _id: 'MONSERRAT' },
          { label: 'PIO XII', year: 'PIO XII' },
          { label: "BELGRANO", year: 'BELGRANO' },
        ],
        getOptionLabel: (option) => option.label,
      });
    
    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
            </div>
            {groupedOptions.length > 0 && (
                <ul {...getListboxProps()}>
                    {groupedOptions.map((option, index) =>(
                        <li {...getOptionProps({option, index})}> {option.label} </li>
                    ))}
                </ul>
            )}
        </>
    )

}

export default AutocompleteMUI