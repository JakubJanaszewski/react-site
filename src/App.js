import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route exact path='/'>
            mainPage
        </Route>
        <Route path='/sing-up'>
            sing up
        </Route>
        <Route path='/log-in'>
            log in
        </Route>
        <Route path='/favorites'>
            favorites
        </Route>
        <Route path='/offer'>
            offer
        </Route>
    </Routes>
  );
}

export default App;
