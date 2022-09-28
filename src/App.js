import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {

  const [data, setData] = useState({})
  const apiKey = "e5529e25780d620c4edb40f665953a79"
  const [inputCity, setInputCity] = useState("")
  const getWeatherData = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      // console.log("Response", res.data)

      setData(res.data)
    }).catch((err) => {
      console.log("Error", err)
    })
  }
  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }
  const handleSearch = () => {
    getWeatherData(inputCity)
  }
  useEffect(() => {
    getWeatherData("Pune")
  }, [])
  return (
    <>
      <div className="col-md-12">
        <div className="weatherbackground">
          <h1 className='heading text-center'>Weather App</h1>

          <div className="buttons d-grid gap-3 col-4 mt-4">
            <input type="text" className="form-control text-center" placeholder='City Name' onChange={handleChangeInput} />
            <button className='btn btn-info' type='button' onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="col-md-12 text-center mt-5">
          <div className="shadow-lg p-1 mb-5 bg-body rounded weatherResultBox">
            <img src="https://png.pngitem.com/pimgs/s/399-3999742_weather-icon-png-image-weather-app-icon-transparent.png" alt="Weather" />
            <h5 className='weatherCity'>{data?.name}</h5>
            <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(0)}°C</h6><br />
            <div className="item">
              <p className='weatherItem'>Humidity</p>
              <p className='weatherItem'>Air Pressure</p>
              <p className='weatherItem'>Wind Speed</p>
            </div>
            <div className="item">
              <p className='weatherItem mx-4'>{((data?.main?.humidity))}%</p>
              <p className='weatherItem mx-2'>{((data?.main?.pressure))} hPa</p>
              <p className='weatherItem mx-2'>{((data?.wind?.speed))} km/h</p>
            </div>
          </div>
        </div><br /><br /><br /><br />
        <div className='foot text-center'>
          <h6>Copyright &copy; Weather App || All Rights Reserved 2004-2022</h6>
        </div>
      </div>
    </>
  );
}

export default App;
