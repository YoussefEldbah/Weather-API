// Today's Card
let nameToday = document.getElementById("today")
let todayDate = document.getElementById("today-date")
let month = document.getElementById("month")

let nameLocation = document.getElementById("namelocation")
let todayDegree = document.getElementById("today-degree")
let todayImg = document.getElementById("today-icon")
let today = document.getElementById("today")
let todayDescription = document.getElementById("today-description")
let humidty = document.getElementById("humidty")
let wind = document.getElementById("wind")
let todayIcon = document.getElementById("compass")


// Tomorrow And After Tomorrow Card
let nextDay = document.getElementsByClassName("nextDay")
let nextDayIcon = document.getElementsByClassName("nextDay-icon")
let maxDegree = document.getElementsByClassName("max-degree")
let minDegree = document.getElementsByClassName("min-degree")
let nextDayDescription = document.getElementsByClassName("nextDay-description")


//  Input Search
let searchInput = document.getElementById("search-bar")
let btnFind = document.getElementById("btn-find")



async function getWeatherDate(cityName) {
let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=57384d6a7d314e33bc1190652240902&q=${cityName}&days=3`)
    let res = await weatherResponse.json()
    return res
}
function displayTodayWeather(date) {
    let todayy=new Date()
    today.innerHTML=todayy.toLocaleDateString("en-US",{weekday:"long"})
    let x= todayy.getDate()+todayy.toLocaleDateString("en-US",{month:"long"})
    console.log(x);
    todayDate.innerHTML=x;
    

    nameLocation.innerHTML=date.location.name
    todayDegree.innerHTML=date.current.temp_c
    todayImg.setAttribute("src",date.current.condition.icon)
    todayDescription.innerHTML=date.current.condition.text
    humidty.innerHTML=date.current.humidity
    wind.innerHTML=date.current.wind_kph
    todayIcon.innerHTML=date.current.wind_dir
}
async function getDateNext(date) {
    let forecastDate=date.forecast.forecastday
    
    for (let i = 0; i < 2; i++) {
         let nextDayCard= new Date(forecastDate[i+1].date)
         nextDay[i].innerHTML=nextDayCard.toLocaleDateString("en-US",{weekday:"long"})
        maxDegree[i].innerHTML=forecastDate[i+1].day.maxtemp_c
        nextDayIcon[i].setAttribute("src",forecastDate[i+1].day.condition.icon)
        minDegree[i].innerHTML=forecastDate[i+1].day.mintemp_c
        nextDayDescription[i].innerHTML=forecastDate[i+1].day.condition.text

    }
}



async function start(city="london") {
    let res= await getWeatherDate(city)
	if (!res.error) {
		displayTodayWeather(res)
		getDateNext(res)
	}
   
}
searchInput.addEventListener("input",function () {
    start(searchInput.value);

})
start()











