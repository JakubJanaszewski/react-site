import classes from './Layout.module.css';
import TopBar from './TopBar';

function Layout(props) {
  return (
    <div>
      <TopBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;