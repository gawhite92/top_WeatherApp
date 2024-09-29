const locationInput = document.getElementById("locationInput"),
    locationSubmitBtn = document.getElementById("locationSubmit"),
    icon = document.getElementById("icon"),
    locationArea = document.getElementById("location"),
    temperature = document.getElementById("temperature"),
    cSelectorBtn = document.querySelector(".cSelector"),
    fSelectorBtn = document.querySelector(".fSelector"),

    dateTime = document.getElementById("dateTime"),
    description = document.getElementById("description"),
    tempHigh = document.getElementById("tempHigh"),
    tempLow = document.getElementById("tempLow"),

    precipitation = document.getElementById("precipitation"),
    humidity = document.getElementById("humidity"),
    wind = document.getElementById("wind"),
    windUnits = document.getElementById("windUnits");

locationSubmitBtn.addEventListener("click", (e) => {
    if (locationInput.value == '') {
        alert('Enter a location')
        return
    }
    newLocation(locationInput.value)
    locationInput.value = ''
});

cSelectorBtn.addEventListener("click", (e) => {
    unitsSelect('c')
    cSelectorBtn.setAttribute("class", "cSelector selected")
    fSelectorBtn.setAttribute("class", "fSelector")
});

fSelectorBtn.addEventListener("click", (e) => {
    unitsSelect('f')
    cSelectorBtn.setAttribute("class", "cSelector")
    fSelectorBtn.setAttribute("class", "fSelector selected")
});

let currentUnits = 'c'

function unitsSelect(units) {
    if (units == currentUnits) {
        console.log('Units are the same. No change')
        return
    } else if(currentUnits == 'c') {
        currentUnits = 'f'
        convertUnits()
    } else {
        currentUnits = 'c'
        convertUnits()
    }
}

const key = 'RMFUFSMP6ZF8UD5G7BEG49QFC'

function newLocation(location) {
    console.log('Fetching data from weather API')

    fetch ("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + key,
     {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            // console.log(response)
            locationArea.innerText = response.resolvedAddress
            
            // console.log('Rendering screen with local weather information')
            dateTime.innerText = response.days[0].datetime
            dateTime.innerText += ` ${response.currentConditions.datetime}`
            temperature.innerText = Math.round(response.currentConditions.temp)
            description.innerText = response.currentConditions.conditions
            tempHigh.innerText = response.days[0].tempmax
            tempLow.innerText = response.days[0].tempmin

            precipitation.innerText = response.currentConditions.precipprob
            humidity.innerText = response.currentConditions.humidity
            wind.innerText = response.currentConditions.windspeed
            
            if(description.innerText.toLowerCase().includes("clear") 
                || description.innerText.toLowerCase().includes("sun")) {
                icon.setAttribute("src", "./icons/sun-4-256.ico")
            } else if (description.innerText.toLowerCase().includes("rain")) {
                icon.setAttribute("src", "./icons/rain-256.ico")
            } else if (description.innerText.toLowerCase().includes("shower")) {
                icon.setAttribute("src", "./icons/little-rain-256.ico")
            } else if (description.innerText.toLowerCase().includes("cloud") 
                ||description.innerText.toLowerCase().includes("overcast") ){
                icon.setAttribute("src", "./icons/clouds-256.ico")
            } else if (description.innerText.toLowerCase().includes("ice") 
                || description.innerText.toLowerCase().includes("snow")) {
                icon.setAttribute("src", "./icons/icy-256.ico")
            } else if (description.innerText.toLowerCase().includes("storm") 
                || description.innerText.toLowerCase().includes("lightning")
                || description.innerText.toLowerCase().includes("thunder")) {
                icon.setAttribute("src", "./icons/cloud-lighting-256.ico")
            }

            if(currentUnits == 'f'){
                return
            } else {
                temperature.innerText = Math.round((temperature.innerText -32) / 1.8)
                tempHigh.innerText = Math.round((response.days[0].tempmax - 32) / 1.8)
                tempLow.innerText = Math.round((response.days[0].tempmin - 32) / 1.8)
                wind.innerText = Math.round(response.currentConditions.windspeed * 1.609)
                windUnits.innerText = "km/h"
            }
        }
    )
        .catch(e => {
            alert(e)
        })
}

function convertUnits(){
    if(currentUnits == 'f'){
        temperature.innerText = Math.round((temperature.innerText * 1.8) + 32)
        tempHigh.innerText = Math.round((tempHigh.innerText * 1.8) + 32)
        tempLow.innerText = Math.round((tempLow.innerText * 1.8) + 32)
        wind.innerText = Math.round(wind.innerText / 1.609)
        windUnits.innerText = "mph"
    } else {
        temperature.innerText = Math.round((temperature.innerText - 32) / 1.8)
        tempHigh.innerText = Math.round((tempHigh.innerText - 32) / 1.8)
        tempLow.innerText = Math.round((tempLow.innerText -32) / 1.8)
        wind.innerText = Math.round(wind.innerText * 1.609)
        windUnits.innerText = "km/h"
    }
}

newLocation('Perth, Australia', 'c'); //Initialises with default location.