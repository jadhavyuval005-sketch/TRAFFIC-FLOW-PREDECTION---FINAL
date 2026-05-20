const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const trafficPage = document.getElementById("trafficPage");
const dashboardPage = document.getElementById("dashboardPage");

document.getElementById("showSignup").onclick = () => {
  loginPage.classList.remove("active-page");
  signupPage.classList.add("active-page");
};

document.getElementById("showLogin").onclick = () => {
  signupPage.classList.remove("active-page");
  loginPage.classList.add("active-page");
};

document.getElementById("loginForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  loginPage.classList.remove("active-page");
  trafficPage.classList.add("active-page");
});

document.getElementById("signupForm").addEventListener("submit",(e)=>{
  e.preventDefault();

  signupPage.classList.remove("active-page");
  loginPage.classList.add("active-page");

  alert("Account Created Successfully!");
});

const form = document.getElementById("trafficForm");

form.addEventListener("submit",(e)=>{

  e.preventDefault();

  const vehicle = parseInt(document.getElementById("vehicle").value);
  const speed = parseInt(document.getElementById("speed").value);
  const hour = parseInt(document.getElementById("hour").value);

  let density = 50;
  let status = "Moderate Traffic";
  let message = "Traffic flow is normal.";

  if(vehicle > 200 || speed < 30 || (hour >= 8 && hour <= 10)){
    density = 85;
    status = "Heavy Traffic";
    message = "Heavy congestion detected in the selected area.";
  }

  if(vehicle < 80 && speed > 50){
    density = 30;
    status = "Low Traffic";
    message = "Smooth traffic flow with low congestion.";
  }

  document.getElementById("densityValue").innerText =
    density + "%";

  document.getElementById("meterFill").style.width =
    density + "%";

  document.getElementById("trafficStatus").innerText =
    status;

  document.getElementById("resultMessage").innerText =
    message;
});

document.getElementById("goDashboard").onclick = () => {

  trafficPage.classList.remove("active-page");

  dashboardPage.classList.add("active-page");
};

document.getElementById("logoutBtn").onclick = () => {

  dashboardPage.classList.remove("active-page");

  loginPage.classList.add("active-page");
};