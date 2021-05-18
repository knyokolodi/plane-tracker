import { BrowserRouter as Router, Route } from 'react-router-dom';

import { GlobalStyle } from './styled/GlobalStyle';
import './App.css';

import Map from './components/map/Map';
import AirPlaneDetail from './components/airplane/AirPlaneDetails';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Router>
        <Route path='/' exact component={Map} />
        <Route path='/airplaneDetail' exact component={AirPlaneDetail} />
      </Router>
    </div>
  );
}

export default App;
