//Geolocation based on https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude and https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation with lots of new key terms
const locationFinder = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let calculatedLatAndLong = document.querySelector("#calculatedLatAndLong")
        calculatedLatAndLong.innerText = `Your latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude}`
    })
}
let myLocation = document.querySelector("#location");
myLocation.addEventListener("click", locationFinder)



//Function to display latitude/longitude map
//https://www.w3schools.com/jsref/prop_style_display.asp
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

//creates variable, connecting HTML's searchButton ID to Javascript
let searchButton = document.querySelector("#searchButton")

//function to connect to API and display relevant data
async function getData (search) {
    
    //needed, as mentioned in the mini-lesson
    search.preventDefault()

    //connects HTML's text input box to Javscript
    let textLatitude = document.querySelector("#latitude").value
    let textLongitude = document.querySelector("#longitude").value

    //${textLatitude}
    //${textLongitude}
    
    //Fetches - Includes temp, sunrise, sunset, rain, snow (in F, Inches, Auto-Time Zone)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${textLatitude}&longitude=${textLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`)

    //needed, as mentioned in the mini-lesson
    .then (res => {
        return res.json()
    })

    // All data API calls & Text Display on HTML
    .then(res => {

        //console log to get full API call
        console.log(res)

        //Time Zone
        console.log(`Time Zone: `, res.timezone)
        let timeZone = document.querySelector("#timezone")
        timeZone.innerText = res.timezone
        
        //Elevation in meters
        console.log(`Elevation (m): `, res.elevation)
        let elevation = document.querySelector("#elevation")
        elevation.innerText = res.elevation

        //7 day forecast data table, referencing https://www.youtube.com/watch?v=XmdOZ5NSqb8 to create a new row each time and using .innerHTML to recognize row/cells being added, instead of just innertext
        const addCellValues = () => {
            let dataTable = document.querySelector("#cellAll")
            dataTable.innerHTML = ``
            for (let i=0; i < res.daily.time.length; i ++) {
                let rows = `<tr>
                            <td>${res.daily.time[i]}</td>
                            <td>${res.daily.temperature_2m_max[i]}</td>
                            <td>${res.daily.temperature_2m_min[i]}</td>
                            <td>${res.daily.sunrise[i]}</td>
                            <td>${res.daily.sunset[i]}</td>
                            <td>${res.daily.rain_sum[i]}</td>
                            <td>${res.daily.snowfall_sum[i]}</td>
                            <td>${res.daily.windspeed_10m_max[i]}</td>
                            <td>${res.daily.winddirection_10m_dominant[i]}</td>
                            </tr>`
                dataTable.innerHTML += rows
                console.log(dataTable.innerHTML)
            }
            }
        addCellValues()

    })

    //needed for errors, as discussed in the mini-lesson
    .catch(err => {
        console.log(`Error!`, err)
    })
}

//search button, upon click runs the getData function for results, comes after
searchButton.addEventListener("click", getData)