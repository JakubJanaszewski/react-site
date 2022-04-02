import { Link } from 'react-router-dom';
import classes from './TopBar.module.css';

function TopBar() {
return (
    <header>
        <div>React Site</div>
        <nav>
            <ul>
                <li> <Link to='/'>          mainPage</Link> </li>
                <li> <Link to='/sing-up'>   Sing Up</Link> </li>
                <li> <Link to='/log-in'>    Log In</Link> </li>
                <li> <Link to='/favorites'> Favorites</Link> </li>
            </ul>
        </nav>
    </header>);
}
export default TopBar;