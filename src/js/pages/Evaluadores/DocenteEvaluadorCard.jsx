import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button";

const DocenteEvaluadorCard = (props) => {

    return (
        <Card title ="Postularme como Evaluador">
            <div className='docente-evaluador'>
                <h6 className='docente-evaluador__title'>¿Sos docente o investigador?</h6>

                <div className='docente-evaluador__buttons'>
                    <Button 
                        text='Docente' 
                        onClickHandler={() => props.setIsDocente(true)}
                        activo={true}
                    />
                    <Button 
                        text='Investigador' 
                        onClickHandler={() => props.setIsDocente(false)}
                        activo={true}
                    />
                </div>
            </div>
        </Card>
          
    );



}

export default DocenteEvaluadorCard;