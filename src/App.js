
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityTable from './Components/CityTable';
import WeatherPage from './Components/WeatherPage';
import Header from './Components/Header'
import About from './Components/About';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
        <Route path="/about" element={<About/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
