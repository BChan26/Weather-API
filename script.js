//https://www.w3schools.com/html/html5_geolocation.asp
// let locationFinder = document.querySelector(#locationFinder)
//     locationFinder.addEventListener("click", locationFinder)

//     const findLocation () => {
//         arguments.getCurrentPosition(pullValue)
//     }
//     const pullValue () => {
//         locationFinder.text = `Your latitude is ${coords.latitude} and your longitude is ${coords.longitude}. Yes, you need that negative sign`
//     }


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
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${textLatitude}&longitude=${textLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,snowfall_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`)

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

        //Sunrise
        console.log(`Sunrise: `, res.daily.sunrise[0])
        let sunrise = document.querySelector("#sunrise")
        sunrise.innerText = res.daily.sunrise[0]

        //Sunset
        console.log(`Sunset: `, res.daily.sunset[0])
        let sunset = document.querySelector("#sunset")
        sunset.innerText = res.daily.sunset[0]
        

        //Elevation in meters
        console.log(`Elevation: `, res.elevation)
        let elevation = document.querySelector("#elevation")
        elevation.innerText = res.elevation

    })

    //needed, as discussed in the mini-lesson
    .catch(err => {
        console.log(`Error!`, err)
    })
}

//search button, upon click runs the getData function for results
searchButton.addEventListener("click", getData)