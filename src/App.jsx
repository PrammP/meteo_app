import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';



const API_KEY = process.env.REACT_APP_API_KEY


function App() {
  const [city, setCity] = useState("")
  const [temperature, setTemperature] = useState()
  const [wind, setWind] = useState();
  const [name, setName] = useState();
  const [position, setPosition] = useState({
    latitude: undefined,
    longitude: undefined
  });
    

  let handleCityChange = (e) => setCity (e.target.value);
  

  let handleCitySubmit = (e) => {
    e.preventDefault();

    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY)
        .then(response => response.json())
        .then(data => { 
          setName (data.name)
          setWind (data.wind.speed)
          setTemperature (data.main.temp - 273.15)
          
        })
        
        .catch(error => console.error(error));
  }

  
  useEffect(()  => {
    navigator.geolocation.getCurrentPosition(
      (p) => setPosition ({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
      }),
      () => console.error('error'));
  },[])

  useEffect(() => {
    if (position.latitude && position.longitude) {
      fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + position.latitude + "&lon=" + position.longitude + "&appid=" + API_KEY)
      .then(response => response.json())
      .then(data => { 
        setName (data.name)
        setWind (data.wind.speed)
        setTemperature (data.main.temp - 273.15)
        
      })
        .catch(error => console.error(error));

    }


  }, [position])
  return (
    <div className="contains">
      {temperature &&
      <div>
        <h1 className="ville">  {name} </h1>
        <p className="temperature">{temperature}°C</p>
        <p className="vent">  {wind} km/h de vent</p>
        
      </div>
      }
      <div className="form">
      <form onSubmit ={handleCitySubmit}>
        <input className="input"
          type="text"
          value={city}
          onChange={handleCityChange} 
          />
        <button className="button" type="submit"> Recherche</button>
      </form>
      </div>
    </div>
  );
}
export default App;
