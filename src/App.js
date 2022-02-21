import React, { Component } from "react"
import "./css/App.css"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import Favourites from "./components/Favourites"
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import API_KEY from "./api.js"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: {
        weather: "",
        city: "",
        country: "",
        temp: 0
      },
      searchDone: false,
      savedCities: [],
      hasSavedCities: false,
      errorMessage: ""
    }
   
    this.state = {hide: false};
    this.callWeatherData = this.callWeatherData.bind(this)
    this.updateSavedCities = this.updateSavedCities.bind(this)
  }

  handleChildClick(){
    this.setState({hide: true});
  }

  callWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
    fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          main: data.main,
          wind: data.wind,
          humidity: data.main.humidity,
          wind_direction: data.wind.deg,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          visibility: data.visibility,
          sunset: data.sys.sunset
        }
        this.setState({
          weatherData: weatherObj,
          searchDone: true,
          errorMessage: ""
        })
      })
      .catch(error => {
        this.setState({ errorMessage: error.message })
      })

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response
    }
  }

  updateSavedCities(cityArr) {
    const hasCities = cityArr.length > 0
    this.setState({ savedCities: cityArr, hasSavedCities: hasCities })
  }

  componentWillMount() {
    let existingCities = JSON.parse(localStorage.getItem("cityList") || "[]")

    if (existingCities.length !== 0) {
      this.setState({
        hasSavedCities: true,
        savedCities: existingCities
      })
    }
  }

  render() {
    const {
      searchDone,
      weatherData,
      hasSavedCities,
      savedCities,
      errorMessage
    } = this.state
    const {hide} = this.state;
        if (hide) {
            return null;
        }
    
    return (      
      <div className="App">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login onClick={this.handleChildClick.bind(this)}/>} />
      </Routes>
        <SearchBar
          callBackFromParent={this.callWeatherData}
          error={errorMessage}
        />
        {searchDone && (
          <WeatherCard
            weatherData={weatherData}
            savedCities={savedCities}
            callBackFromParent={this.updateSavedCities}
          />
        )}
        {hasSavedCities && (
          <Favourites
            savedCities={savedCities}
            callBackFromParent={this.callWeatherData}
          />
        )}
      </div>
    )
  }
}

export default App
