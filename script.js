/* =========================================
   PAGE REFERENCES
========================================= */

const loginPage =
document.getElementById("loginPage");

const signupPage =
document.getElementById("signupPage");

const trafficPage =
document.getElementById("trafficPage");

const dashboardPage =
document.getElementById("dashboardPage");

/* =========================================
   LOGIN / SIGNUP SYSTEM
========================================= */

/* SHOW SIGNUP */

document.getElementById("showSignup")
.addEventListener("click",(e)=>{

  e.preventDefault();

  loginPage.classList.remove("active-page");

  signupPage.classList.add("active-page");

});

/* SHOW LOGIN */

document.getElementById("showLogin")
.addEventListener("click",(e)=>{

  e.preventDefault();

  signupPage.classList.remove("active-page");

  loginPage.classList.add("active-page");

});

/* BACK BUTTONS */

document.querySelectorAll(".back-btn")
.forEach(button=>{

  button.addEventListener("click",()=>{

    signupPage.classList.remove("active-page");

    trafficPage.classList.remove("active-page");

    dashboardPage.classList.remove("active-page");

    loginPage.classList.add("active-page");

  });

});

/* LOGIN */

document
.getElementById("loginForm")
.addEventListener("submit",(e)=>{

  e.preventDefault();

  loginPage.classList.remove("active-page");

  trafficPage.classList.add("active-page");

});

/* SIGNUP */

document
.getElementById("signupForm")
.addEventListener("submit",(e)=>{

  e.preventDefault();

  alert(
    "Account Created Successfully!"
  );

  signupPage.classList.remove("active-page");

  loginPage.classList.add("active-page");

});

/* =========================================
   AI TRAFFIC PREDICTION
========================================= */

const form =
document.getElementById("trafficForm");

form.addEventListener("submit",(e)=>{

  e.preventDefault();

  const vehicle =
  parseInt(
    document.getElementById("vehicle").value
  ) || 0;

  const speed =
  parseInt(
    document.getElementById("speed").value
  ) || 0;

  const hour =
  parseInt(
    document.getElementById("hour").value
  ) || 0;

  const weather =
  document.getElementById("weather").value;

  const road =
  document.getElementById("road").value;

  const zoneElement =
  document.getElementById("zone");

  const zone =
  zoneElement
  ? zoneElement.value
  : "City Center";

  let density = 50;

  let status =
  "Moderate Traffic";

  let message =
  "Traffic is moving normally.";

  let route =
  "Use Main City Route";

  /* PEAK HOURS */

  if(
    (hour >= 8 && hour <= 10) ||
    (hour >= 17 && hour <= 20)
  ){

    density += 20;

    message =
    "Peak hour detected.";

  }

  /* WEATHER ANALYSIS */

  if(
    weather === "Rainy" ||
    weather === "Foggy" ||
    weather === "Stormy"
  ){

    density += 15;

    message +=
    " Weather impact detected.";

  }

  /* ROAD CONDITIONS */

  if(road === "Accident"){

    density += 25;

    route =
    "Suggested Route: Highway Bypass";

  }

  if(road === "Construction"){

    density += 15;

    route =
    "Suggested Route: Ring Road";

  }

  if(road === "Road Closed"){

    density += 30;

    route =
    "Suggested Route: Emergency Diversion";

  }

  /* VEHICLE ANALYSIS */

  if(vehicle > 200 || speed < 30){

    density += 15;

  }

  if(vehicle < 80 && speed > 50){

    density = 25;

    status =
    "Low Traffic";

    message =
    "Smooth traffic flow.";

    route =
    "Fastest Route Available";

  }

  /* ZONE ANALYSIS */

  if(zone === "City Center"){
    density += 10;
  }

  if(zone === "Industrial Zone"){
    density += 8;
  }

  /* FINAL STATUS */

  if(density >= 80){

    status =
    "Heavy Traffic";

    message +=
    " Heavy congestion expected.";

  }

  else if(density <= 40){

    status =
    "Low Traffic";

  }

  /* LIMIT DENSITY */

  if(density > 100){
    density = 100;
  }

  /* UPDATE UI */

  const densityValue =
  document.getElementById(
    "densityValue"
  );

  const meterFill =
  document.getElementById(
    "meterFill"
  );

  if(densityValue){
    densityValue.innerText =
    density + "%";
  }

  if(meterFill){
    meterFill.style.width =
    density + "%";
  }

  document.getElementById(
    "trafficStatus"
  ).innerText =
  status;

  document.getElementById(
    "resultMessage"
  ).innerText =
  message;

  const routeSuggestion =
  document.getElementById(
    "routeSuggestion"
  );

  if(routeSuggestion){

    routeSuggestion.innerText =
    route;

  }

});

/* =========================================
   OPEN DASHBOARD
========================================= */

document.getElementById(
  "goDashboard"
).addEventListener("click",()=>{

  trafficPage.classList.remove(
    "active-page"
  );

  dashboardPage.classList.add(
    "active-page"
  );

  loadCharts();

});

/* =========================================
   LOGOUT BUTTON
========================================= */

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

  logoutBtn.addEventListener(
    "click",
    ()=>{

      alert(
        "Logged out successfully!"
      );

      dashboardPage.classList.remove(
        "active-page"
      );

      loginPage.classList.add(
        "active-page"
      );

    }
  );

}

/* =========================================
   SIDEBAR NAVIGATION
========================================= */

const menuItems =
document.querySelectorAll(".menu");

const sections =
document.querySelectorAll(
  ".dashboard-section"
);

menuItems.forEach(item=>{

  item.addEventListener(
    "click",
    ()=>{

      menuItems.forEach(menu=>{

        menu.classList.remove(
          "active"
        );

      });

      item.classList.add(
        "active"
      );

      sections.forEach(section=>{

        section.classList.add(
          "hidden"
        );

      });

      const targetSection =
      document.getElementById(
        item.dataset.section
      );

      if(targetSection){

        targetSection.classList.remove(
          "hidden"
        );

      }

    }
  );

});

/* =========================================
   CHARTS LOADER
========================================= */

let chartsLoaded = false;

function loadCharts(){

  if(chartsLoaded) return;

  chartsLoaded = true;

  /* BAR CHART */

  new Chart(
    document.getElementById(
      "trafficChart"
    ),
    {

      type:"bar",

      data:{

        labels:[
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],

        datasets:[{

          label:
          "Traffic Density",

          data:[
            65,
            59,
            80,
            81,
            90,
            70,
            60
          ],

          backgroundColor:[
            "#2563eb",
            "#06b6d4",
            "#22c55e",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#14b8a6"
          ],

          borderRadius:10

        }]

      },

      options:chartOptions()

    }
  );

  /* PIE CHART */

  new Chart(
    document.getElementById(
      "pieChart"
    ),
    {

      type:"pie",

      data:{

        labels:[
          "Low",
          "Moderate",
          "Heavy"
        ],

        datasets:[{

          data:[
            25,
            45,
            30
          ],

          backgroundColor:[
            "#22c55e",
            "#facc15",
            "#ef4444"
          ],

          borderColor:"#0f172a",

          borderWidth:3

        }]

      },

      options:chartOptions(false)

    }
  );

  /* LINE CHART */

  const lineChart =
  document.getElementById(
    "lineChart"
  );

  if(lineChart){

    new Chart(
      lineChart,
      {

        type:"line",

        data:{

          labels:[
            "6AM",
            "8AM",
            "10AM",
            "1PM",
            "5PM",
            "8PM"
          ],

          datasets:[{

            label:
            "Peak Hour Traffic",

            data:[
              20,
              80,
              60,
              40,
              95,
              70
            ],

            borderColor:"#06b6d4",

            backgroundColor:
            "rgba(6,182,212,0.2)",

            fill:true,

            tension:0.4,

            pointBackgroundColor:
            "#06b6d4",

            pointRadius:5

          }]

        },

        options:chartOptions()

      }
    );

  }

  /* ZONE CHART */

  const zoneChart =
  document.getElementById(
    "zoneChart"
  );

  if(zoneChart){

    new Chart(
      zoneChart,
      {

        type:"doughnut",

        data:{

          labels:[
            "City Center",
            "Highway",
            "Residential",
            "Industrial"
          ],

          datasets:[{

            data:[
              40,
              25,
              20,
              15
            ],

            backgroundColor:[
              "#2563eb",
              "#22c55e",
              "#f59e0b",
              "#ef4444"
            ]

          }]

        },

        options:chartOptions(false)

      }
    );

  }

  /* VEHICLE CHART */

  const vehicleChart =
  document.getElementById(
    "vehicleChart"
  );

  if(vehicleChart){

    new Chart(
      vehicleChart,
      {

        type:"doughnut",

        data:{

          labels:[
            "Cars",
            "Bikes",
            "Buses",
            "Trucks"
          ],

          datasets:[{

            data:[
              40,
              30,
              15,
              15
            ],

            backgroundColor:[
              "#2563eb",
              "#06b6d4",
              "#22c55e",
              "#f59e0b"
            ]

          }]

        },

        options:chartOptions(false)

      }
    );

  }

  /* MONTHLY CHART */

  const monthlyChart =
  document.getElementById(
    "monthlyChart"
  );

  if(monthlyChart){

    new Chart(
      monthlyChart,
      {

        type:"line",

        data:{

          labels:[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul"
          ],

          datasets:[{

            label:
            "Traffic Growth",

            data:[
              200,
              350,
              300,
              500,
              450,
              650,
              700
            ],

            borderColor:"#06b6d4",

            backgroundColor:
            "rgba(6,182,212,0.2)",

            fill:true,

            tension:0.4,

            pointRadius:5

          }]

        },

        options:chartOptions()

      }
    );

  }

}

/* =========================================
   COMMON CHART OPTIONS
========================================= */

function chartOptions(showScales = true){

  return{

    responsive:true,

    plugins:{

      legend:{
        labels:{
          color:"white"
        }
      }

    },

    scales:showScales
    ? {

        x:{
          ticks:{
            color:"white"
          },

          grid:{
            color:
            "rgba(255,255,255,0.05)"
          }
        },

        y:{
          ticks:{
            color:"white"
          },

          grid:{
            color:
            "rgba(255,255,255,0.05)"
          }
        }

      }
    : {}

  };

}

/* =========================================
   LIVE CLOCK
========================================= */

function updateClock(){

  const now = new Date();

  const hours =
  now.getHours()
  .toString()
  .padStart(2,"0");

  const minutes =
  now.getMinutes()
  .toString()
  .padStart(2,"0");

  const seconds =
  now.getSeconds()
  .toString()
  .padStart(2,"0");

  const clockElement =
  document.getElementById(
    "liveClock"
  );

  if(clockElement){

    clockElement.innerText =
    `${hours}:${minutes}:${seconds}`;

  }

}

setInterval(updateClock,1000);

/* =========================================
   LIVE AI PREDICTION
========================================= */

function updatePrediction(){

  const predictions = [

    "Heavy congestion expected near City Center.",

    "Traffic flow smooth on Highway Route B.",

    "Rain may increase traffic density by 20%.",

    "Accident detected near Industrial Zone.",

    "Peak hour traffic expected at 6 PM."

  ];

  const randomPrediction =

  predictions[
    Math.floor(
      Math.random() *
      predictions.length
    )
  ];

  const predictionElement =
  document.getElementById(
    "aiPrediction"
  );

  if(predictionElement){

    predictionElement.innerText =
    randomPrediction;

  }

}

setInterval(updatePrediction,5000);

/* =========================================
   WEATHER STATUS
========================================= */

function updateWeather(){

  const weatherData = [

    "☀ Sunny - Low Traffic",

    "🌧 Rainy - Heavy Congestion",

    "🌫 Foggy - Slow Vehicle Movement",

    "⛅ Cloudy - Moderate Traffic"

  ];

  const randomWeather =

  weatherData[
    Math.floor(
      Math.random() *
      weatherData.length
    )
  ];

  const weatherElement =
  document.getElementById(
    "weatherStatus"
  );

  if(weatherElement){

    weatherElement.innerText =
    randomWeather;

  }

}

setInterval(updateWeather,4000);

/* =========================================
   LIVE VEHICLE COUNTER
========================================= */

let vehicleCount = 12540;

function updateVehicleCounter(){

  vehicleCount +=
  Math.floor(Math.random()*20);

  const counter =
  document.getElementById(
    "vehicleCounter"
  );

  if(counter){

    counter.innerText =
    vehicleCount.toLocaleString();

  }

}

setInterval(updateVehicleCounter,3000);

/* =========================================
   AI ALERT NOTIFICATIONS
========================================= */

function showNotification(message){

  const notification =
  document.createElement("div");

  notification.classList.add(
    "notification"
  );

  notification.innerText =
  message;

  document.body.appendChild(
    notification
  );

  setTimeout(()=>{

    notification.remove();

  },4000);

}

/* RANDOM ALERTS */

const alerts = [

  "⚠ Heavy congestion detected!",

  "🚑 Emergency vehicle approaching!",

  "🌧 Rain may slow traffic movement!",

  "🚧 Road construction ahead!"

];

setInterval(()=>{

  const randomAlert =

  alerts[
    Math.floor(
      Math.random() *
      alerts.length
    )
  ];

  showNotification(
    randomAlert
  );

},12000);

/* =========================================
   DARK MODE TOGGLE
========================================= */

const darkModeToggle =
document.getElementById(
  "darkModeToggle"
);

if(darkModeToggle){

  darkModeToggle.addEventListener(
    "change",
    ()=>{

      if(darkModeToggle.checked){

        document.body.style.background =
        "linear-gradient(135deg,#020617,#001b4d,#0f172a)";

        document.body.style.color =
        "white";

      }

      else{

        document.body.style.background =
        "linear-gradient(135deg,#dbeafe,#e0f2fe,#f8fafc)";

        document.body.style.color =
        "#0f172a";

      }

    }
  );

}

/* =========================================
   SETTINGS RANGE VALUE
========================================= */

const sensitivitySlider =
document.querySelector(
  'input[type="range"]'
);

if(sensitivitySlider){

  sensitivitySlider.addEventListener(
    "input",
    ()=>{

      console.log(
        "Sensitivity:",
        sensitivitySlider.value
      );

    }
  );

}

/* =========================================
   PAGE LOAD EFFECT
========================================= */

window.addEventListener(
  "load",
  ()=>{

    document.body.style.opacity =
    "1";

  }
);

/* =========================================
   CARD ANIMATIONS
========================================= */

const cards =
document.querySelectorAll(".card");

cards.forEach((card,index)=>{

  card.style.animation =
  `fadeUp 0.6s ease forwards`;

  card.style.animationDelay =
  `${index * 0.1}s`;

});

/* =========================================
   DYNAMIC STYLE
========================================= */

const style =
document.createElement("style");

style.innerHTML = `

@keyframes fadeUp{

  from{
    opacity:0;
    transform:translateY(30px);
  }

  to{
    opacity:1;
    transform:translateY(0);
  }

}

.notification{

  position:fixed;

  top:20px;
  right:20px;

  background:
  linear-gradient(
    to right,
    #2563eb,
    #06b6d4
  );

  color:white;

  padding:16px 24px;

  border-radius:14px;

  box-shadow:
  0 10px 25px rgba(0,0,0,0.3);

  z-index:9999;

  animation:
  slideIn 0.5s ease;
}

@keyframes slideIn{

  from{
    opacity:0;
    transform:translateX(100px);
  }

  to{
    opacity:1;
    transform:translateX(0);
  }

}

`;

document.head.appendChild(style);
