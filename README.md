# Project Title: Weather-API

### [Trello Invite Link to View](https://trello.com/invite/b/8Jibxuu4/750705a2f1c82f0abe6ff47730fcf268/weather-api "Trello")

### Description: 
- I have created a weather app that tells your forecast based on your latitude and longitude.

### Features:
- 2 methods for finding your latitude and longitude (If you allow location access, it autofills)
- Weather with either Imperial (U.S.A) Units or Metric Units
- Today's Forecast
- Hourly Forecast
    - Time
    - Temp
    - Cloud Cover
    - Humidity
    - Rain
    - Snowfall
    - Wind Speed
- 7 Day Forecast
    - High Temp
    - Low Temp
    - Sunrise
    - Sunset 
    - Rain
    - Snowfall
    - Max Wind
    - Wind Direction
- If you change the latitude and longitude, then run it again, new values appear in the table

### What I've Learned/Reinforced
- HTML: 
    - How to link the HTML file to the CSS/JS files
    - How to add images to my HTML file with relative links
    - The different HTML elements that we can use (divs, forms, input types of text vs button, lists, line breaks, tables)
    - The different ID's or classes we can assign to various HTML elements
- CSS: 
    - Using flexbox to style/organize my HTML elements
    - Customizing colors and table elements (like borders)
    - How to apply a gradient background to the entire page
    - How to use the "display" style with a value of 'none' and 'flex' and 'block' to show/hide my HTML elements
    - Responsive CSS with resizing of the screen used
- Javascript: 
    - How to utilize navigator.geolocation property & getCurrentPosition() method to find the latitude/longitude
    - How to utilize document.querySelector to connect our HTML and Javascript files (DOM)
    - How an event listener connected to a function needs to come after the function it's referencing
    - How to connect my Javascript file to an API (Application Programming Index)
    - How to write/structure a function to call the API
        - async function getData (search) {
            - search.preventDefault()
            - fetch()
            - .then (res => {return res.json()})
            - .then(res => {your function and what you want to do with the API data}
            - .catch(err => {console.log(`Error!`, err)})
        }
    - Scope, via trying to create a unit converter on API data ouput within/from an async function
- General: 
    - The importance of planning ahead and starting early, so glaring errors (like keys not working) can be addressed
    - Working together with classmates and brainstorming/troubleshooting

### Credits:  
- [Open-Meteo Weather API](https://open-meteo.com/en/docs "Open-Meteo Weather API")
- Image Sites Used
    - [Icons](https://icons8.com "Icons8")
    - [Latitude/Longitude Map](https://www.99worksheets.com/4th-grade/social-studies-4th-grade/latitude-and-longitude/ "Latitude and Longitude Map") 
    - [Wind Direction Key](https://allmaritime.blogspot.com/2009/11/weather-winds.html "Wind Direction Key")

- HTML/CSS/Javascript Sites Used
    - [W3Schools - CSS Gradients](https://www.w3schools.com/css/css3_gradients.asp "CSS Gradients")
    - [W3Schools - Display Property (None vs. Flex)](https://www.w3schools.com/jsref/prop_style_display.asp "Display Property")
    - [CSS-Tricks - Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/ "CSS Tricks - Flexbox")
    - [MDN Mozilla - Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude "MDN Geolocation")
    - [MDN Mozilla - navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation "MDN navigator.geolocation")
    - [Youtube - Creating HTML Table (connected to an array) with Javascript](https://www.youtube.com/watch?v=XmdOZ5NSqb8 "Youtube Tutorial: JSON Array to HTML Table with Javascript")
    - [W3Schools - String Slice](https://www.w3schools.com/js/js_string_methods.asp"W3Schools "String Slice")
    - [W3Schools - "Enter" Button Event Listener](https://www.w3schools.com/HOWTO/howto_js_trigger_button_enter.asp "Trigger a Button Click on Enter")

- People Who Supported Me
    - SEI Instructional Team (Jeremy/Tiffany/Brittany/Kristina/Tylus) for guidance, suggestions, and problem solving
    - SEI Classmates (Everyone) for brainstorming, sharing ideas, and keeping me company in Zoom breakout rooms
    - A classmate's significant other who helped clarify the units needed for latitude/longitude