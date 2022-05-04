import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import HeroSearch from './components/HeroSearch';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'
import ProvideAuth from './components/ProvideAuth';
import HeroDetails from './components/HeroDetails';
import { AUTH_TOKEN } from './constants';
import heroTeamContext from './contexts/teamContext';

function App() {

  const [heroes, setHeroes] = useState([]);

  const [powerStats, setPowerStats] = useState({
    intelligence: { name: 'Intelligence', value: 0 },
    strength: { name: 'Strength', value: 0 },
    speed: { name: 'Speed', value: 0 },
    durability: { name: 'Durability', value: 0 },
    power: { name: 'Power', value: 0 },
    combat: { name: 'Combat', value: 0 }
  });

  const [sumWeight, setSumWeight] = useState(parseInt(0));
  const [sumHeight, setSumHeight] = useState(0);
  const [averageWeight, setAverageWeight] = useState(0);
  const [averageHeight, setAverageHeight] = useState(0);


  return (
    <>
      <ProvideAuth>
        <Router>
          <div className='container mt-4 '>
            <div className='btn-group d-flex justify-content-between'>
              <div>
                <Link to="/" className='btn btn-dark mx-2 px-5'>
                  Home
                </Link>
                <Link to="/heroSearch" className='btn btn-dark mx-2 px-5'>
                  Search
                </Link>
              </div>
              <div className=''>
                <Link to="/logout" component={({ children }) => {
                  return (
                    <div className='btn btn-dark mx-2 ' onClick={() => {
                      window.localStorage.removeItem(AUTH_TOKEN)
                      window.location.reload()
                    }}>
                      {children}
                    </div>
                  )
                }}>
                  Log out
                </Link>
              </div>
            </div>
            <hr />

            <Switch>
              <heroTeamContext.Provider value={{
                heroes, powerStats, sumWeight, averageWeight, sumHeight, averageHeight,
                setPowerStats, setHeroes, setSumWeight, setAverageWeight, setSumHeight,
                setAverageHeight
              }}>
                <Route path="/" exact>
                  <PrivateRoute component={Home} />
                </Route>
                <Route path="/heroSearch">
                  <PrivateRoute component={HeroSearch} />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/hero/:heroId">
                  <HeroDetails />
                </Route>
              </heroTeamContext.Provider>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;
