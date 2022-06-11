import Chat from '../components/chat/Chat';
import classes from '../components/layout/Layout.module.css';

function Help() {
  return (
    <div className={classes.chat}>
      <h1>Need some help?</h1>
      <h3>Feel free to ask any question at help@komis.com or use our instant support from bot:</h3>
      <Chat></Chat>
    </div>
  );
}
  
export default Help;
  