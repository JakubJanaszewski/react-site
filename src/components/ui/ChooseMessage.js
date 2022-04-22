import classes from './ErrorMessage.module.css'

function ChooseMessage(props){
    return(
        <div>
            <div className={classes.backdrop} onClick={props.onCancel}></div>
            <div className={classes.message}>
                <div className={classes.description}>{props.description}</div>
                <button className={classes.btn} onClick={props.onConfirm}>
                    {props.buttonConfirm}
                </button>
                <button className={classes.btn} onClick={props.onCancel}>
                    {props.buttonCancel}
                </button>
            </div>
        </div>
    );
}

export default ChooseMessage;