import './css/styles.css';
import './images/turing-logo.png';
import './images/pngdesert.png'
import {userProfileData, userActivityData, userSleepData, userHydrationData, addActivityData} from './apiCalls';
import UserRepository from './UserRepository';
import SleepRepository from './sleep-repository';
import Activity from './Activity';
import Hydration from './Hydration'
import HydrationRepository from './HydrationRepository';
import User from './User';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';

// QUERY SELECTORS
let friends = document.getElementById('friends');
let welcomeName = document.getElementById('name');
let stepGoal = document.getElementById('step-goal');
let stepsTaken = document.getElementById('steps-taken');
let minsActive = document.getElementById('mins-active');
let flights = document.getElementById('flights');
let lastSleep = document.getElementById('last-sleep');
let weeklySleep = document.getElementById('weekly-sleep');
let avgSleep = document.getElementById('avg-sleep');
let avgQuality = document.getElementById('avg-quality')
let waterDrank = document.getElementById('water');
let weeklyWater = document.getElementById('weekly-water');
let email = document.getElementById('email');
let avgStepGoal = document.getElementById('avg-step-goal');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let milesWalked = document.getElementById("miles-walked");
let allUserDailyAvgSteps = document.getElementById("all-users-avg-steps");
let allUsersDailyAvgFlights = document.getElementById("all-users-avg-flights");
let allUsersDailyAvgMinActive = document.getElementById("all-users-avg-mins-active");
let weeklyUserSteps = document.getElementById("weekly-steps");
let weeklyUserFlights = document.getElementById("weekly-flights");
let weeklyUserMinActive = document.getElementById("weekly-mins-active");
let sleepFormSubmit = document.getElementById("submit-sleep");
let hydrationFormSubmit = document.getElementById("submit-hydration");
let activityFormSubmit = document.getElementById("submit-activity");

//  QUERY SELECTORS: FORM INPUT
let sleepRadio = document.getElementById("sleep-radio");
let hydrationRadio = document.getElementById("hydration-radio");
let activityRadio = document.getElementById("activity-radio");
let sleepForm = document.getElementById("sleep-form");
let hydrationForm = document.getElementById("hydration-form");
let activityForm = document.getElementById("activity-form");

// EVENT LISTENERS
sleepRadio.addEventListener("click", toggleFormVisibility);
hydrationRadio.addEventListener("click", toggleFormVisibility);
activityRadio.addEventListener("click", toggleFormVisibility);
// sleepFormSubmit.addEventListener("click", submitForm);
// hydrationFormSubmit.addEventListener("click", submitForm);
activityFormSubmit.addEventListener("click", submitActivityForm);

// GLOBAL VARIABLE
let displayedUsersID = Math.floor(Math.random() * 50);

Promise.all([userProfileData, userActivityData, userSleepData, userHydrationData])
  .then(data => {
    userDataHelper(data[0].userData);
    activityDataHelper(data[1].activityData);
    sleepDataHelper(data[2].sleepData);
    hydrationDataHelper(data[3].hydrationData);
  })
  .catch((error) => alert("Oops something went wrong. Try again later."));

//POST Request

function submitActivityForm(e){
  e.preventDefault();
  let date = document.getElementById("activity-date-input").value;
  let betterDate = dayjs(date).format("YYYY/MM/DD");
  let steps = document.getElementById("activity-steps-input").value;
  let activeMins = document.getElementById("activity-minutes").value;
  let flights = document.getElementById("activity-stairs").value;
  let postActiveObject = createSleepPostObject(betterDate, steps, activeMins, flights);

    console.log(betterDate)
  addActivityData(postActiveObject);
  activityForm.reset();
}

function createSleepPostObject(date, steps, activeMins, flights){
  let object = {
    userID: displayedUsersID,
    date: date,
    numSteps: steps,
    minutesActive: activeMins,
    flightsOfStairs: flights,
  }
  return object
}

// DOM
const displayUserInfo = (user, userRepo) => {
  const getFriendsNames = user.friends.map((friend) => {
    return userRepo.getUserById(friend).name;
  });
  welcomeName.innerHTML = `WELCOME, ${user.getUserFirstName().toUpperCase()}`;
  firstName.innerText = `${user.getUserFirstName().toUpperCase()}`;
  lastName.innerText = `${user.getUserLastName().toUpperCase()}`;
  stepGoal.innerHTML = `<b>Your Daily Step Goal:</b><br>${user.dailyStepGoal} Steps`;
  email.innerHTML = `<b>email:</b> ${user.email}`;
  friends.innerHTML = `<b>friends:</b> ${getFriendsNames}`;
  avgStepGoal.innerHTML = `<b>FitLit Avg. Step Goal:</b><br>${userRepo.calculateAvgStepGoal()} Steps`;
  makeChart(user.dailyStepGoal, userRepo.calculateAvgStepGoal());
};

const displayActivityInfo = (activityRepo) => {
  const allUsersActivity = activityRepo.findUser(displayedUsersID);
  const lastActivityElement = allUsersActivity[allUsersActivity.length -1];
  const date = lastActivityElement.date;

  const weeklySteps = activityRepo.getWeeklyReportPerUnit(displayedUsersID, date, 'numSteps');
  const stepKeys = Object.keys(weeklySteps);

  const weeklyFlights = activityRepo.getWeeklyReportPerUnit(displayedUsersID, date, 'flightsOfStairs');
  const flightKeys = Object.keys(weeklyFlights);

  const userMinsActiveWeek = activityRepo.getWeeklyReportPerUnit(displayedUsersID, date, 'minutesActive');
  const minsActiveKeys = Object.keys(userMinsActiveWeek);

  stepsTaken.innerHTML = `<b>Steps today</b>: ${lastActivityElement.numSteps} steps`;
  minsActive.innerHTML = `<b>Minutes active</b>: ${lastActivityElement.minutesActive} min.`;
  flights.innerHTML = `<b>Flights conquered</b>: ${lastActivityElement.flightsOfStairs} flights`;

  milesWalked.innerHTML = `<b>Miles walked</b>: ${activityRepo.milesPerDay(displayedUsersID, lastActivityElement.date)} miles`;

  allUserDailyAvgSteps.innerHTML = `${activityRepo.allUsersAverageUnits('numSteps')}`;
  allUsersDailyAvgFlights.innerHTML = `${activityRepo.allUsersAverageUnits('flightsOfStairs')}`;
  allUsersDailyAvgMinActive.innerHTML = `${activityRepo.allUsersAverageUnits('minutesActive')}`;

  weeklyUserSteps.innerHTML =  `
  <div>${Array.from(stepKeys[6]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[6]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[5]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[5]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[4]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[4]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[3]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[3]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[2]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[2]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[1]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[1]]}</b></div>  steps</div></div>
  <div>${Array.from(stepKeys[0]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklySteps[stepKeys[0]]}</b></div>  steps</div></div>`;

  weeklyUserFlights.innerHTML = `
  <div>${Array.from(flightKeys[6]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[6]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[5]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[5]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[4]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[4]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[3]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[3]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[2]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[2]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[1]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[1]]}</b></div>  flights</div></div>
  <div>${Array.from(flightKeys[0]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${weeklyFlights[flightKeys[0]]}</b></div>  flights</div></div>`;

  weeklyUserMinActive.innerHTML = `
    <div>${Array.from(minsActiveKeys[6]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[6]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[5]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[5]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[4]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[4]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[3]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[3]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[2]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[2]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[1]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[1]]}</b></div>  min.</div></div>
    <div>${Array.from(minsActiveKeys[0]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${userMinsActiveWeek[minsActiveKeys[0]]}</b></div>  min.</div></div>`;
};

const displaySleepInfo = (id, sleepRepo) => {
  const allUserData = sleepRepo.getAllUserData(id);
  const sleep = sleepRepo.makeNewSleep(id, allUserData);
  lastSleep.innerHTML = `${sleep.latest.hoursSlept}`;
  weeklySleep.innerHTML = `<b>Weekly Avg:</b> ${sleep.calculateWeeklyAvg(sleep.latest.date, "hoursSlept")} hrs.<br>`;
  avgSleep.innerHTML = `<b>Average Hours Slept:</b> ${sleep.avgHoursSlept}<br> hrs.`;
  avgQuality.innerHTML = `<b>Average Sleep Quality Rating:</b> ${sleep.avgSleepQuality}`;
};

const displayHydrationInfo = (id, hydrationRepo) => {
  const lastElement = hydrationRepo.hydrationData[hydrationRepo.hydrationData.length-1];
  const waterByWeek = hydrationRepo.getFluidOuncesEachDayOfWeek(id, lastElement.date);
  const keys = Object.keys(waterByWeek);
  waterDrank.innerHTML = `${hydrationRepo.getFluidOuncesByDate(id, lastElement.date)}`;
  weeklyWater.innerHTML = `
  <div>${Array.from(keys[6]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[6]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[5]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[5]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[4]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[4]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[3]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[3]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[2]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[2]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[1]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[1]]}</b></div>  oz.</div></div>
  <div>${Array.from(keys[0]).splice(5).join("")}: <div class="a"><div class="med-text"><b>${waterByWeek[keys[0]]}</b></div>  oz.</div></div>`;
};

// HELPER FUNCTIONS
const getAllUsers = (userData) => {
  const createUsersArray = userData.map((user) => {
      return new User(user);
  });
  return createUsersArray;
};

const getAllHydrationData = (hydrationData) => {
  const createHydrationArray = hydrationData.map((data) => {
      return new Hydration(data);
  });
  return createHydrationArray;
};

const userDataHelper = (data) => {
  const usersArray = getAllUsers(data);
  const userRepo = new UserRepository(usersArray);
  displayUserInfo(userRepo.getUserById(displayedUsersID), userRepo);
};

const hydrationDataHelper = (data) => {
  const hydrationArray = getAllHydrationData(data);
  const hydrationRepo = new HydrationRepository(data);
  displayHydrationInfo(displayedUsersID, hydrationRepo);
};

const sleepDataHelper = (data) => {
  const sleepRepo = new SleepRepository(data);
  displaySleepInfo(displayedUsersID, sleepRepo);
};

const activityDataHelper = (data) => {
  const activityRepo = new Activity(data);
  displayActivityInfo(activityRepo);
};

// USER INPUT

function toggleFormVisibility(){
  if(sleepRadio.checked){
    sleepForm.classList.remove("hidden");
    hydrationForm.className = "hidden";
    activityForm.className = "hidden";
  } else if (hydrationRadio.checked){
    hydrationForm.classList.remove("hidden");
    sleepForm.className = "hidden";
    activityForm.className = "hidden";
  } else if (activityRadio.checked){
    activityForm.classList.remove("hidden");
    hydrationForm.className = "hidden";
    sleepForm.className = "hidden";
  }
}

// WEIRD CHART EXPERIMENT STUFF

const ctx = document.getElementById('myChart');

function makeChart(userGoal, avgGoal){
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Your Goal', 'Avg. Goal'],
          datasets: [{
              label: '# of Steps',
              data: [userGoal, avgGoal],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
const dctx = document.getElementById('donut');
makeAnotherChart()
function makeAnotherChart(){
  const myDonutChart = new Chart(dctx, {
    type: 'doughnut',
    data: {
        labels: ['Your Goal', 'Avg. Goal'],
        datasets: [{
            label: '# of Steps',
            data: [10, 15],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
