/////////Globally created variables, connecting HTML's ID to Javascript/////////
let usaButton = document.querySelector("#usaButton")
let textLatitude = document.querySelector("#latitude")
let textLongitude = document.querySelector("#longitude")
let metricButton = document.querySelector("#metricButton")



///////////////////////////////Geolocation//////////////////////////////////
//https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude
//Uses navigator.geolocation to get location, with method "getCurrentPosition"
const locationFinder = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let calculatedLatAndLong = document.querySelector("#calculatedLatAndLong")
        calculatedLatAndLong.innerText = `Your latitude is ${position.coords.latitude} & longitude is ${position.coords.longitude}.`
        //These 2 lines change the value inside of the lat/long input boxes
        textLatitude.value = position.coords.latitude
        textLongitude.value = position.coords.longitude
    })
}
//variable to connect button to Javascript, with event listener to execute the function
let myLocation = document.querySelector("#location")
myLocation.addEventListener("click", locationFinder)



/////////////////////////////Toggling Map//////////////////////////////////////
//https://www.w3schools.com/jsref/prop_style_display.asp
//Function to show latitude/longitude map
const showMap = () => {
    document.querySelector("#map").style.display = `flex`
}

//Show map button (which has to come after function)
let buttonToggleMap = document.querySelector("#buttonToggleMap")
buttonToggleMap.addEventListener("click", showMap)

//Function to hide latitude/longitude map
const hideMap = () => {
    document.querySelector("#map").style.display = `none`
}

//Hide map button (which has to come after function)
let toggleMapSwitch = document.querySelector("#toggleMapSwitch")
toggleMapSwitch.addEventListener("click", hideMap)



/////////////////////////////Toggling Hourly Table/////////////////////////////
//Function to show hourly table
const showHourly = () => {
    document.querySelector("#hourly").style.display = `block`
}

//Show hourly button (which has to come after function)
let hourlyToggleShow = document.querySelector("#hourlyShow")
hourlyToggleShow.addEventListener("click", showHourly)

//Function to hide hourly table
const hideHourly = () => {
    document.querySelector("#hourly").style.display = `none`
}

//Hide hourly button (which has to come after function)
let hourlyToggleHide = document.querySelector("#hourlyHide")
hourlyToggleHide.addEventListener("click", hideHourly)



///////////////////////////Toggling 7-Day Table//////////////////////////////
//Function to show 7 day table
const showSevenDay = () => {
    document.querySelector("#sevenDay").style.display = `block`
}

//Show 7 day table (which has to come after function)
let sevenToggleShow = document.querySelector("#sevenShow")
sevenToggleShow.addEventListener("click", showSevenDay)

//Function to hide 7 day table
const hideSevenDay = () => {
    document.querySelector("#sevenDay").style.display = `none`
}

//Hide 7 Day Table (which has to come after function)
let sevenToggleHide = document.querySelector("#sevenHide")
sevenToggleHide.addEventListener("click", hideSevenDay)



//////////////////////////////IMPERIAL API CALL////////////////////////////////

//function to connect to API and display relevant data for IMPERIAL
async function getImperialData () {
    
    //Fetches from https://open-meteo.com/en/docs
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${textLatitude.value}&longitude=${textLongitude.value}&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,cloudcover_low,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`)

    //needed, as mentioned in the mini-lesson
    .then (res => {
        return res.json()
    })

    // All data API calls & DOM Text Display on HTML
    .then(res => {

        //console log to get full API call
        console.log(res)

        //Time Zone
        let timeZone = document.querySelector("#timezone")
        timeZone.innerText = res.timezone

        //Forecast Data Tables
        //Referenced https://www.youtube.com/watch?v=XmdOZ5NSqb8
        //Learned to create a new row each time, using .innerHTML to recognize the row/cells being added (instead of just using innertext)
        //Referenced https://www.w3schools.com/js/js_string_methods.asp
        //Learned to slice to clean up text for date/sunrise/sunset
        //Robert from class also helped me brainstorm to apply math to values as needed
        const myWeatherImperial = () => {
            
            //Just Today's Forecast
            let justTodayTable = document.querySelector("#todayOnly")
            justTodayTable.innerHTML = ``

            for (let k=0; k<1; k++) {
                let todaysRow =`<tr>
                                <td>${res.daily.time[k].slice(5)}</td>
                                <td>${res.daily.temperature_2m_max[k]} (°F)</td>
                                <td>${res.daily.temperature_2m_min[k]} (°F)</td>
                                <td>${res.daily.sunrise[k].slice(11)}</td>
                                <td>${res.daily.sunset[k].slice(11)}</td>
                                <td>${res.daily.rain_sum[k]} (in)</td>
                                <td>${res.daily.snowfall_sum[k]*0.3937} (in)</td>
                                <td>${res.daily.windspeed_10m_max[k]} (mph)</td>
                                <td>${res.daily.winddirection_10m_dominant[k]}°</td>
                                </tr>`
                justTodayTable.innerHTML += todaysRow
            }

            //Hourly Forecast
            let hourlyTable = document.querySelector("#hourlyAll")
            hourlyTable.innerHTML = ``

            for (let j=0; j < 24; j++) {
                let hourlyRows=`<tr>
                                <td>${res.hourly.time[j].slice(11)}</td>
                                <td>${res.hourly.temperature_2m[j]} (°F)</td>
                                <td>${res.hourly.cloudcover_low[j]} (%)</td>
                                <td>${res.hourly.relativehumidity_2m[j]} (%)</td>
                                <td>${res.hourly.rain[j]} (in)</td>
                                <td>${res.hourly.snowfall[j]*0.3937} (in)</td>
                                <td>${res.hourly.windspeed_10m[j]} (mph)</td>
                                </tr>`
                hourlyTable.innerHTML += hourlyRows
            }

            //7 Day Forecast
            let dataTable = document.querySelector("#cellAll")
            dataTable.innerHTML = ``

            for (let i=0; i < res.daily.time.length; i ++) {
                let rows = `<tr>
                            <td>${res.daily.time[i].slice(5)}</td>
                            <td>${res.daily.temperature_2m_max[i]} (°F)</td>
                            <td>${res.daily.temperature_2m_min[i]} (°F)</td>
                            <td>${res.daily.sunrise[i].slice(11)}</td>
                            <td>${res.daily.sunset[i].slice(11)}</td>
                            <td>${res.daily.rain_sum[i]} (in)</td>
                            <td>${res.daily.snowfall_sum[i]*0.3937} (in)</td>
                            <td>${res.daily.windspeed_10m_max[i]} (mph)</td>
                            <td>${res.daily.winddirection_10m_dominant[i]}°</td>
                            </tr>`
                dataTable.innerHTML += rows
            }
            }
        myWeatherImperial()
    })
    //needed for errors, as discussed in the mini-lesson
    .catch(err => {
        console.log(`Error!`, err)
    })
}

//search button, upon click runs the getImperialData function for results, comes after
usaButton.addEventListener("click", () => {
    getImperialData()
})

///////////////////////////////METRIC API CALL/////////////////////////////////////
//function to connect to API and display relevant data for METRIC
async function getMetricData () {
    
    //Fetches from https://open-meteo.com/en/docs
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${textLatitude.value}&longitude=${textLongitude.value}&hourly=temperature_2m,relativehumidity_2m,rain,snowfall,cloudcover_low,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&timezone=auto`)

    //needed, as mentioned in the mini-lesson
    .then (res => {
        return res.json()
    })

    // All data API calls & DOM Text Display on HTML
    .then(res => {

        //console log to get full API call
        console.log(res)

        //Time Zone
        let timeZone = document.querySelector("#timezone")
        timeZone.innerText = res.timezone

        //Forecast Data Tables
        //Referenced https://www.youtube.com/watch?v=XmdOZ5NSqb8
        //Learned to create a new row each time, using .innerHTML to recognize the row/cells being added (instead of just using innertext)
        //Referenced https://www.w3schools.com/js/js_string_methods.asp
        //Learned to slice to clean up text for date/sunrise/sunset
        //Robert from class also helped me brainstorm to apply math to values as needed
        const myWeatherImperial = () => {
            
            //Just Today's Forecast
            let justTodayTable = document.querySelector("#todayOnly")
            justTodayTable.innerHTML = ``

            for (let k=0; k<1; k++) {
                let todaysRow =`<tr>
                                <td>${res.daily.time[k].slice(5)}</td>
                                <td>${res.daily.temperature_2m_max[k]} (°C)</td>
                                <td>${res.daily.temperature_2m_min[k]} (°C)</td>
                                <td>${res.daily.sunrise[k].slice(11)}</td>
                                <td>${res.daily.sunset[k].slice(11)}</td>
                                <td>${res.daily.rain_sum[k]*0.1} (cm)</td>
                                <td>${res.daily.snowfall_sum[k]} (cm)</td>
                                <td>${res.daily.windspeed_10m_max[k]} (km/h)</td>
                                <td>${res.daily.winddirection_10m_dominant[k]}°</td>
                                </tr>`
                justTodayTable.innerHTML += todaysRow
            }

            //Hourly Forecast
            let hourlyTable = document.querySelector("#hourlyAll")
            hourlyTable.innerHTML = ``

            for (let j=0; j < 24; j++) {
                let hourlyRows=`<tr>
                                <td>${res.hourly.time[j].slice(11)}</td>
                                <td>${res.hourly.temperature_2m[j]} (°C)</td>
                                <td>${res.hourly.cloudcover_low[j]} (%)</td>
                                <td>${res.hourly.relativehumidity_2m[j]} (%)</td>
                                <td>${res.hourly.rain[j]*0.1} (cm)</td>
                                <td>${res.hourly.snowfall[j]} (cm)</td>
                                <td>${res.hourly.windspeed_10m[j]} (km/h)</td>
                                </tr>`
                hourlyTable.innerHTML += hourlyRows
            }

            //7 Day Forecast
            let dataTable = document.querySelector("#cellAll")
            dataTable.innerHTML = ``

            for (let i=0; i < res.daily.time.length; i ++) {
                let rows = `<tr>
                            <td>${res.daily.time[i].slice(5)}</td>
                            <td>${res.daily.temperature_2m_max[i]} (°C)</td>
                            <td>${res.daily.temperature_2m_min[i]} (°C)</td>
                            <td>${res.daily.sunrise[i].slice(11)}</td>
                            <td>${res.daily.sunset[i].slice(11)}</td>
                            <td>${res.daily.rain_sum[i]*0.1} (cm)</td>
                            <td>${res.daily.snowfall_sum[i]} (cm)</td>
                            <td>${res.daily.windspeed_10m_max[i]} (km/h)</td>
                            <td>${res.daily.winddirection_10m_dominant[i]}°</td>
                            </tr>`
                dataTable.innerHTML += rows
            }
            }
        myWeatherImperial()
    })
    //needed for errors, as discussed in the mini-lesson
    .catch(err => {
        console.log(`Error!`, err)
    })
}

//search button, upon click runs the getMetricData function for results, comes after
metricButton.addEventListener("click", () => {
    getMetricData()
})


// //////////////Event Listener for Enter Button & Imperial/////////////////////
// //https://www.w3schools.com/HOWTO/howto_js_trigger_button_enter.asp

// //Event listener for hitting enter button, associated with the longitude box
// textLongitude.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         event.preventDefault()
//         getImperialData()
//     }
// })

// //Event listener for hitting enter button, associated with the latitude box
// textLatitude.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         event.preventDefault()
//         getImperialData()
//     }
// })