import Chat from '../components/websocket/Chat';
import classes from '../components/layout/Layout.module.css';

function Help() {
  return (<>
    <div className={classes.sign}>
      <Chat></Chat>
    </div>
  </>);
}
  
export default Help;
  