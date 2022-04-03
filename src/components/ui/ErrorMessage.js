import classes from './ErrorMessage.module.css'

function ErrorMessage(props){
    return(
        <div>
            <div className={classes.backdrop} onClick={props.onCancel}></div>
            <div className={classes.message}>
                <div className={classes.description}>{props.description}</div>
                <button className={classes.btn} onClick={props.onCancel}>
                    {props.button}
                </button>
            </div>
        </div>
    );
}

export default ErrorMessage;