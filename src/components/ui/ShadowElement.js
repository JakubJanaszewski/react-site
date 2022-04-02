import classes from './ShadowElement.module.css';

function ShadowElement(props) {
  return <div className={classes.shadow}>{props.children}</div>;
}

export default ShadowElement;