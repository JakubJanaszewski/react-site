import { Link } from 'react-router-dom';
import classes from './TopBar.module.css';

function TopBar() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>React Site</div>
            <nav>
                <ul>
                    <li><Link to="/">Main Page</Link></li>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                    <li><Link to="/sign-in">Sign In</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default TopBar;