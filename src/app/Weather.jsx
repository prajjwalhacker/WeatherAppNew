"use client"

import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";
import clear from '../../public/images/clear.png'
import search from '../../public/images/search.png'
import wind from '../../public/images/wind.png'
import humidity from '../../public/images/humidity.png'
import drizzle from '../../public/images/drizzle.png'
import mist from '../../public/images/mist.png'
import rain from '../../public/images/rain.png'
import cloud from '../../public/images/clouds.png'
const API_KEY = '77dfe7903bd21efbc773dad1b2f1b521';
import { Grid } from 'react-loader-spinner';



export default function Weather() {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)

    const inputRef = useRef(null);

    const weatherApiCall = async (city) => {
        setError({})
        let inputCity = city;
        if (!city?.length) {
            inputCity = 'delhi'
        }
        setLoading(true)
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const result = await res.json();
        setLoading(false)

        console.log(result?.wind, "winnd")

        if (result?.message === 'city not found') {
            setError({
                msg: result?.message,
                error: true,
            })
            return;
        }

        const cityWeatherData = {
            name: inputCity,
            temp: result?.main?.temp,
            humidity: result?.main?.humidity,
            speed: result?.wind?.speed,
            weather: result?.weather?.[0]?.main,
        }
        setWeatherData(cityWeatherData)
    }

    const renderImage = () => {
        if (!weatherData?.weather) return clear.src;
        if (weatherData.weather === 'Clouds') {
            return cloud.src
        }
        if (weatherData?.weather === 'clear') {
            return clear.src
        }
        if (weatherData?.weather === 'Rain') {
            return rain.src
        }
        if (weatherData?.weather === 'Drizzle') {
            return drizzle.src
        }
        if (weatherData?.weather === 'Mist') {
            return mist.src
        }
        if (weatherData?.weather === 'Haze') {
            return drizzle.src
        }
        return clear.src;
    }

    useEffect(() => {
        inputRef.current.focus();
        weatherApiCall('Delhi')
    }, [])


    return (
        <main className={styles.main}>
            <div className={styles.weatherContainer}>
                <div>Check Weather</div>
                <div className={styles.searchInputContainer}>
                    <input className={styles.cityInput} type="text" onChange={(e) => { setCity(e.target.value) }} value={city} ref={inputRef} placeholder="search city..." />
                    <div className={styles.searchIconContainer} onClick={() => {
                        weatherApiCall(city)
                    }}>
                        <img src={search.src} alt="" className={styles.searchImage} />
                    </div>
                </div>
                {error?.error ? <div className={styles.errorMessage}>{error?.msg}</div> : null}
                {error?.error ? null : loading ? <Grid
                    visible={true}
                    height="80"
                    width="80"
                    color="#ffffff"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass="grid-wrapper"
                /> : <>
                       <div className={styles.weatherDataContainer}>
                    <img src={renderImage()} alt="" className={styles.weatherCondition} />
                </div>
                <div>
                    {`${weatherData?.temp} C`}
                </div>
                <div>
                    {weatherData?.name}
                </div>
                <div className={styles.otherWeatherData}>
                    <div className={styles.humidityContainer}>
                        <img className={styles.humidity} src={humidity.src} alt="" />
                        <div className={styles.humidityData}>
                            <div>
                                {`${weatherData?.humidity} %`}
                            </div>
                            <div>
                                Humidity
                            </div>
                        </div>
                    </div>
                    <div className={styles.windContainer}>
                        <img className={styles.windSpeed} src={wind.src} alt="" />
                        <div className={styles.windData}>
                            <div>
                                {`${weatherData?.speed} km/hr`}
                            </div>
                            <div>
                                Wind Speed
                            </div>
                        </div>

                    </div>
                </div>
                </>}
            </div>
        </main>
    );
}

