import CardData from "../CardData/CardData";



const SignupConfirmColumn = (props) => {

    const rows = []
    
    for (let i = 0; i < props.titles.length; i++) {
        rows.push(<div className="signup-confirm-column__data" >
        <CardData title={props.titles[i]} value={props.values[i]}/>
    </div>)
        
    }



    return (
        <div className="signup-confirm-column">
            {rows.map((row, i) => {
                return (row)
                
            })}

            
        </div>
    );
}

export default SignupConfirmColumn;