import classes from './ShadowElement.module.css';

function ShadowElement(props) {
  return <div className={classes.shadow} style={{'width': props.width}} >{props.children}</div>;
}

export default ShadowElement;