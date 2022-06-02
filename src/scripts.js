import './css/styles.css';
import './images/turing-logo.png';
import './images/pngdesert.png'
import {userProfileData, userActivityData, userSleepData, userHydrationData} from './apiCalls';
import UserRepository from './UserRepository';
import SleepRepository from './sleep-repository';
import Activity from './Activity';
import Hydration from './Hydration'
import HydrationRepository from './HydrationRepository';
import User from './User';
import Chart from 'chart.js/auto';

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
  makeChart(user.dailyStepGoal, userRepo.calculateAvgStepGoal())
};

const displayActivityInfo = (activityRepo) => {
  const allUsersActivity = activityRepo.findUser(displayedUsersID);
  stepsTaken.innerHTML = `<b>Steps this week</b>: ${allUsersActivity[allUsersActivity.length -1].numSteps} steps`;
  minsActive.innerHTML = `<b>Minutes active</b>: ${allUsersActivity[allUsersActivity.length -1].minutesActive} min.`;
  flights.innerHTML = `<b>Flights conquered</b>: ${allUsersActivity[allUsersActivity.length -1].flightsOfStairs} flights`;
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
