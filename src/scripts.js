import './css/styles.css';

import './images/turing-logo.png';

import {fetchUserData, fetchUserActivity, fetchUserSleep, fetchUserHydration} from './apiCalls';
import UserRepository from './UserRepository';
import SleepRepository from './sleep-repository';
import Activity from './Activity';
import HydrationRepository from './HydrationRepository';
import User from './User';

let friends = document.getElementById('friends');
let welcomeName = document.getElementById('name');
let stepGoal = document.getElementById('step-goal');
let stepsTaken = document.getElementById('steps-taken');
let minsActive = document.getElementById('mins-active');
let flights = document.getElementById('flights');
let lastSleep = document.getElementById('last-sleep');
let weeklySleep = document.getElementById('weekly-sleep');
let avgSleep = document.getElementById('avg-sleep');
let waterDrank = document.getElementById('water');
let weeklyWater = document.getElementById('weekly-water');
let email = document.getElementById('email');
let avgStepGoal = document.getElementById('avg-step-goal');


let displayedUsersID = Math.floor(Math.random() * 50);

Promise.all([fetchUserData(), fetchUserActivity(), fetchUserSleep(), fetchUserHydration()])
  .then(data => {
    console.log(data)
    userDataHelper(data[0].userData);
    activityDataHelper(data[1].activityData)
    sleepDataHelper(data[2].sleepData);
    hydrationDataHelper(data[3].hydrationData);
});

//  HELPER FUNCTIONS
function getAllUsers(userData) {
  const createUsersArray = userData.map((user) => {
      return new User(user);
  });
  return createUsersArray;
};

function userDataHelper(data) {
  const usersArray = getAllUsers(data);
  const userRepo = new UserRepository(usersArray);
  displayUserInfo(userRepo.getUserById(displayedUsersID), userRepo);
};

function hydrationDataHelper(data) {
  const hydrationRepo = new HydrationRepository(data);
  displayHydrationInfo(displayedUsersID, hydrationRepo);
};

function sleepDataHelper(data) {
  const sleepRepo = new SleepRepository(data);
  displaySleepInfo(displayedUsersID, sleepRepo)
};

function activityDataHelper(data) {
  const activityRepo = new Activity(data)
  displayActivityInfo(activityRepo)
};

let firstName = document.getElementById('first-name')
let lastName = document.getElementById('last-name')


//  DOM
function displayUserInfo(user, userRepo) {
  const getFriendsNames = user.friends.map((friend) => {
    return userRepo.getUserById(friend).name;
  });
  welcomeName.innerHTML = `WELCOME, ${user.getUserFirstName().toUpperCase()}`;
  firstName.innerText = `${user.getUserFirstName().toUpperCase()}`
  lastName.innerText = `${user.getUserLastName().toUpperCase()}`
  stepGoal.innerText = `${user.dailyStepGoal}`;
  email.innerText = `${user.email}`;
  friends.innerText = `${getFriendsNames}`;
  avgStepGoal.innerText = `${userRepo.calculateAvgStepGoal()}`;

};

function displayActivityInfo(activityRepo){
  const allUsersActivity = activityRepo.findUser(displayedUsersID)
  stepsTaken.innerText = `Steps: ${allUsersActivity[allUsersActivity.length -1].numSteps}`
  minsActive.innerText = `Minutes Active: ${allUsersActivity[allUsersActivity.length -1].minutesActive}`
  flights.innerText = `Flights Taken: ${allUsersActivity[allUsersActivity.length -1].flightsOfStairs}`
};

function displaySleepInfo(id, sleepRepo) {
  const allUserData = sleepRepo.getAllUserData(id);
  const sleep = sleepRepo.makeNewSleep(id, allUserData);

  lastSleep.innerText = `Last Night: ${sleep.latest.hoursSlept}`
  weeklySleep.innerText = `Weekly Avg: ${sleep.calculateAvg(sleep.latest.date, "hoursSlept")}`
  avgSleep.innerHTML = `Average Hours Slept: ${sleep.avgHoursSlept}<br>Average Sleep Quality: ${sleep.avgSleepQuality}`
}


function displayHydrationInfo(id, hydrationRepo) {
  const lastElement = hydrationRepo.hydrationData[hydrationRepo.hydrationData.length-1];
  const waterByWeek = hydrationRepo.getFluidOuncesEachDayOfWeek(id, lastElement.date);
  const keys = Object.keys(waterByWeek);
  waterDrank.innerText += `: ${hydrationRepo.getFluidOuncesByDate(id, lastElement.date)} ounces`;
  weeklyWater.innerHTML += `: <br>${keys[6]}: ${waterByWeek[keys[6]]} ounces<br>
                            ${keys[5]}: ${waterByWeek[keys[5]]} ounces<br>
                            ${keys[4]}: ${waterByWeek[keys[4]]} ounces<br>
                            ${keys[3]}: ${waterByWeek[keys[3]]} ounces<br>
                            ${keys[2]}: ${waterByWeek[keys[2]]} ounces<br>
                            ${keys[1]}: ${waterByWeek[keys[1]]} ounces<br>
                            ${keys[0]}: ${waterByWeek[keys[0]]} ounces<br>`
};
