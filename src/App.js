import './App.css';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import Navbar from './components/navbar';
import Crud from './components/crud';
import HomeScreen from './components/homeScreen';
import Table from './components/table';


function App() {
  return (
    <Router>
      <div className="App">
        <div className='header'>
          <Navbar />
        </div>
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/crud">
              <Crud />
            </Route>
            <Route exact path="/table">
              <Table />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
