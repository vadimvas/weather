// 88cc3662d8f57d9430cc5af1d14270fe
// 52.970759, 36.064348
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
let body = document.querySelector('body')
let wrapper = document.querySelector('#wrapper')
let weathers
let apiKey = '88cc3662d8f57d9430cc5af1d14270fe'
let lat = 52.97
let lon = 36.06
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
let temperatur = document.getElementById('temperatur')
let feels = document.getElementById('feels-like')
let wind = document.getElementById('wind')//ветер
let timenow = document.getElementById('time')
let datenow = document.getElementById('date')
let arrday = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']
let arrmonth = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
let img = document.getElementById('img')
let humidity = document.getElementById('humidity')//влажность
let discription = document.getElementById('discription')
let pressure = document.getElementById('pressure')
let city = document.getElementById('city')
let min = document.getElementById('min')
let max = document.getElementById('max')
let speedWind = document.getElementById('speed')
let visibility = document.getElementById('visibility')
let timer = document.querySelector('#timer')
let but1 = document.getElementById('but1')
let but2 = document.getElementById('but2')



but1.addEventListener('click',function(){
   wrapper.classList.toggle('bg-dojd')
})
but2.addEventListener('click',function(){
   wrapper.classList.toggle('bg-snow')
})

// let geoloc = window.navigator.geolocation.getCurrentPosition(function succes(position){
//    lat = position.coords.latitude//широта
//    lon = position.coords.longitude//долгота
   
// })



// формируем запрос GET на сервер (цепочкой)

axios.get(url).then(res => {
    weathers = res.data
    console.log(weathers)
    console.log()


    setInterval (function () {
        let time = new Date()
        let hours = time.getHours()
        let minut = time.getMinutes()
        let sec = time.getSeconds()


        let r = new Date(weathers['sys']['sunrise']*1000)
     
        let z = new Date(weathers['sys']['sunset']*1000)
      


       //время рассвета
        let hoursSunrise = r.getHours()
        let minutsSunrise = r.getMinutes()

      //  время заката
        let hoursSunset = z.getHours()
        let minutsSunset = z.getMinutes()

    
      
      //   city.textContent =  `день длится ${Math.floor((weathers['sys']['sunset']-weathers['sys']['sunrise'])/60/60)} часов ${Math.floor((weathers['sys']['sunset']-weathers['sys']['sunrise'])/60-(Math.floor((weathers['sys']['sunset']-weathers['sys']['sunrise'])/60/60)*60))} мин`
      //   timer.textContent=`до заката осталось${timeHoursSunset}часов : ${minutsSunset} минут`
      //   if (timeHoursSunset>0){
      //    console.log(true)
      //   }
      
      minutsSunset = minutsSunset<10?"0"+minutsSunset:minutsSunset
      minutsSunrise = minutsSunrise<10?"0"+minutsSunrise:minutsSunrise
      timer.textContent = `рассвет в ${hoursSunrise} : ${minutsSunrise}`
        city.textContent = `закат в ${hoursSunset} : ${minutsSunset}`
      
        let objDiscription = {
         'overcast clouds':'пасмурнo',
         'broken clouds':'облачно',
         'scattered clouds':'облачно',
         'few clouds':'малооблачно',
         'clear sky':'безоблачно',
         'light snow':'небольшой снег',
         'snow':'снег',
         'heavy snow':'сильный снегопад',
         'sleet':'мокрый снег',
         'light shower sleet':'дождь с мокрым снегом'
      }
       
      
  

       discription.textContent =objDiscription[ weathers['weather'][0]['description']]//ОБЛАЧНОСТЬ(берем данные из объекта objDiscription )
       temperatur.innerHTML = Math.round(weathers['main']['temp'])+'<span>°C</span>'//ТЕМПЕРАТУРА
       min.textContent = `min ${Math.floor(weathers['main']['temp_min'])} °`
       max.textContent = `max ${Math.ceil(weathers['main']['temp_max'])} °`

        hours = hours<10?"0"+hours:hours
        minut = minut<10?"0"+minut:minut
        sec=sec<10?"0"+sec:sec
        timenow.textContent = hours + ':' + minut + ':' + sec//ВРЕМЯ
        datenow.textContent = arrday[time.getDay()]+' , '+time.getDate()+' '+arrmonth[time.getMonth()]+' '+time.getFullYear()+' г.'//ДАТА
       
        feels.textContent = 'ощущается как '+Math.round(weathers['main']['feels_like'])
        img.innerHTML = weathers['weather'][0]['id']
       
        iconWeather()


        humidity.textContent = 'влажность: '+weathers['main']['humidity']+' %'
        pressure.textContent = `давление: ${weathers['main']['pressure']} гПа`
        visibility.textContent = `видимость: ${(weathers['visibility']/1000)} км`

        let veter = weathers['wind']['deg']

        if(veter>=0 && veter<=90){
         wind.textContent = `ветер: северо-восточный`
        }else if(veter>90 && veter<=180){
         wind.textContent = `ветер: юго-восточный`
        }else if(veter>180 && veter<=270){
         wind.textContent = `ветер: юго-западный `
        }else if(veter>270 && veter<=360){
         wind.textContent = `ветер: северо-западный `
        }

        //скорость ветра
        speedWind.textContent = `${weathers['wind']['speed']} м/с`






      // ПРОВЕКА АНИМАЦИИ =>
      // weathers['weather'][0]['id'] = '502' 
      

      
      
      // Смена дня и ночи
        if(time.getTime()>=r.getTime() && time.getTime()<=z.getTime()){
         body.classList.add('bg-den')
        }else{
         body.classList.add('bg-noch-zp')
        }
        


        
        // добавляем снег или дождь
        if(weathers['weather'][0]['id'] == '600' || weathers['weather'][0]['id'] == '601'||weathers['weather'][0]['id'] == '602' || weathers['weather'][0]['id'] == '622'){
         wrapper.classList.add('bg-snow')
        }else if(weathers['weather'][0]['id'] == '502'||weathers['weather'][0]['id'] == '503'||weathers['weather'][0]['id'] == '521'||weathers['weather'][0]['id'] == '522'||weathers['weather'][0]['id'] == '200'||weathers['weather'][0]['id'] == '201'||weathers['weather'][0]['id'] == '202'||weathers['weather'][0]['id'] == '500'||weathers['weather'][0]['id'] == '501'||weathers['weather'][0]['id'] == '520'){
         wrapper.classList.add('bg-dojd')
        }
        
        
      }, 1000)//конец setInterval
           
           
   })
        
  
  
  






function iconWeather(){//выводит иконки погоды

        
    if (img.textContent=='200'|| img.textContent=='201'|| img.textContent=='202'){
        img.innerHTML='<img src="icon/09.png" alt=""></img>'
     }
    if (img.textContent=='500'|| img.textContent=='501'|| img.textContent=='520'){
        img.innerHTML='<img src="icon/06.png" alt=""></img>'
     }
     if (img.textContent=='502'|| img.textContent=='503'||img.textContent=='521'|| img.textContent=='522'){
        img.innerHTML='<img src="icon/07.png" alt=""></img>'
     }
    if (img.textContent=='600'|| img.textContent=='601'){
       img.innerHTML='<img src="icon/10.png" alt=""></img>'
    }
    if (img.textContent=='602'|| img.textContent=='622'){
        img.innerHTML='<img src="icon/11.png" alt=""></img>'
     }
     if (img.textContent=='701'|| img.textContent=='721'||img.textContent=='741'|| img.textContent=='721'){
        img.innerHTML='<img src="icon/02.png" alt=""></img>'
     }
     if (img.textContent=='800'){
        img.innerHTML='<img src="icon/01.png" alt=""></img>'
     }
     if (img.textContent=='801'|| img.textContent=='802'){
        img.innerHTML='<img src="icon/02.png" alt=""></img>'
     }
     if (img.textContent=='803'){
        img.innerHTML='<img src="icon/04.png" alt=""></img>'
     }
     if (img.textContent=='804'){
        img.innerHTML='<img src="icon/05.png" alt=""></img>'
     }
    }






