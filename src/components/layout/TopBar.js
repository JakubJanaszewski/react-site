import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './TopBar.module.css';
import AccountContext from '../../context/account-context';

function TopBar() {
    const signedContext = useContext(AccountContext);
    function logoutHandler(){
        signedContext.setSignState(false);
        signedContext.setToken(0);
    }
    
    return (
        <header className={classes.header}>
            <Link className={classes.logo} to="/">Main Page</Link>
            <nav>
                <ul>
                    {(!signedContext.isSignedIn) ?
                    <><li><Link to="/sign-up">Sign Up</Link></li> 
                    <li><Link to="/sign-in">Sign In</Link></li></>
                    : 
                    <><li><Link to="/new-offer">New Offer</Link></li>
                    <li><Link to="/my-offers">My Offers</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                    <li><button onClick={logoutHandler}>{"Logout"}</button></li>
                    <li><h1>{"Welcome " + signedContext.name +" !"}</h1></li></>}
                </ul>
            </nav>
        </header>
    );
}
export default TopBar;