let button = document.querySelector("#searchButton")

async function getData (search) {
    search.preventDefault()

    //connects HTML's text input box to Javscript
    let textLatitude = document.querySelector("#latitude").value
    let textLongitude = document.querySelector("#longitude").value

    //${textLatitude}
    //${textLongitude}
    
    //Fetches
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${textLatitude}&longitude=${textLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,snowfall_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`)

    //first then call, don't touch this one
    .then (res => {
        return res.json()
    })

    //All data calls here
    .then(res => {

        //console log to get full API call
        console.log(res)

        console.log(`Time Zone: `, res.timezone)
        let timeZone = document.querySelector("#timezone")
        timeZone.innerText = res.timezone

        console.log(`Sunrise: `, res.results.sunrise)
        let sunrise = document.querySelector("#sunrise")
        sunrise.innerText = res.results.sunrise

        console.log(`Sunset: `, res.results.sunset)
        let sunset = document.querySelector("#sunset")
        sunset.innerText = res.results.sunset

    })

    .catch(err => {
        console.log(`Error!`, err)
    })
}

//button runs search
button.addEventListener("click", getData)