import './css/styles.css';
import './images/turing-logo.png';
import './images/pngdesert.png'
import {fetchUserData, fetchUserActivity, fetchUserSleep, fetchUserHydration} from './apiCalls';
import UserRepository from './UserRepository';
import SleepRepository from './sleep-repository';
import Activity from './Activity';
import Hydration from './Hydration'
import HydrationRepository from './HydrationRepository';
import User from './User';

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

// GLOBAL VARIABLE
let displayedUsersID = Math.floor(Math.random() * 50);

Promise.all([fetchUserData(), fetchUserActivity(), fetchUserSleep(), fetchUserHydration()])
  .then(data => {
    console.log(data)
    userDataHelper(data[0].userData);
    activityDataHelper(data[1].activityData);
    sleepDataHelper(data[2].sleepData);
    hydrationDataHelper(data[3].hydrationData);
});

// HELPER FUNCTIONS
function getAllUsers(userData) {
  const createUsersArray = userData.map((user) => {
      return new User(user);
  });
  return createUsersArray;
};

function getAllHydrationData(hydrationData) {
  const createHydrationArray = hydrationData.map((data) => {
      return new Hydration(data);
  });
  return createHydrationArray;
};

function userDataHelper(data) {
  const usersArray = getAllUsers(data);
  const userRepo = new UserRepository(usersArray);
  displayUserInfo(userRepo.getUserById(displayedUsersID), userRepo);
};

function hydrationDataHelper(data) {
  const hydrationArray = getAllHydrationData(data);
  const hydrationRepo = new HydrationRepository(data);
  displayHydrationInfo(displayedUsersID, hydrationRepo);
};

function sleepDataHelper(data) {
  const sleepRepo = new SleepRepository(data);
  displaySleepInfo(displayedUsersID, sleepRepo);
};

function activityDataHelper(data) {
  const activityRepo = new Activity(data);
  displayActivityInfo(activityRepo);
};

// DOM
function displayUserInfo(user, userRepo) {
  const getFriendsNames = user.friends.map((friend) => {
    return userRepo.getUserById(friend).name;
  });
  welcomeName.innerHTML = `WELCOME, ${user.getUserFirstName().toUpperCase()}`;
  firstName.innerText = `${user.getUserFirstName().toUpperCase()}`;
  lastName.innerText = `${user.getUserLastName().toUpperCase()}`;
  stepGoal.innerText = `${user.dailyStepGoal} Steps`;
  email.innerHTML = `<b>email:</b> ${user.email}`;
  friends.innerHTML = `<b>friends:</b> ${getFriendsNames}`;
  avgStepGoal.innerText = `${userRepo.calculateAvgStepGoal()} Steps`;
};

function displayActivityInfo(activityRepo) {
  const allUsersActivity = activityRepo.findUser(displayedUsersID);
  stepsTaken.innerHTML = `<b>Steps this week</b>: ${allUsersActivity[allUsersActivity.length -1].numSteps} steps`;
  minsActive.innerHTML = `<b>Minutes active</b>: ${allUsersActivity[allUsersActivity.length -1].minutesActive} min.`;
  flights.innerHTML = `<b>Flights conquered</b>: ${allUsersActivity[allUsersActivity.length -1].flightsOfStairs} flights`;
};

function displaySleepInfo(id, sleepRepo) {
  const allUserData = sleepRepo.getAllUserData(id);
  const sleep = sleepRepo.makeNewSleep(id, allUserData);
  lastSleep.innerHTML = `<b>Last Night:</b> you slept ${sleep.latest.hoursSlept} hours!`;
  weeklySleep.innerHTML = `<b>Weekly Avg:</b> ${sleep.calculateWeeklyAvg(sleep.latest.date, "hoursSlept")} hrs.<br>`;
  avgSleep.innerHTML = `<b>Average Hours Slept:</b> ${sleep.avgHoursSlept}<br> hrs.`;
  avgQuality.innerHTML = `<b>Average Sleep Quality Rating:</b> ${sleep.avgSleepQuality}`;
};

function displayHydrationInfo(id, hydrationRepo) {
  const lastElement = hydrationRepo.hydrationData[hydrationRepo.hydrationData.length-1];
  const waterByWeek = hydrationRepo.getFluidOuncesEachDayOfWeek(id, lastElement.date);
  const keys = Object.keys(waterByWeek);
  waterDrank.innerHTML = `<b>Today's Intake</b>: ${hydrationRepo.getFluidOuncesByDate(id, lastElement.date)} oz.`;
  weeklyWater.innerHTML = `<b>Weekly Water</b>: <br>${keys[6]}: ${waterByWeek[keys[6]]} oz.<br>
                            ${keys[5]}: ${waterByWeek[keys[5]]} oz.<br>
                            ${keys[4]}: ${waterByWeek[keys[4]]} oz.<br>
                            ${keys[3]}: ${waterByWeek[keys[3]]} oz.<br>
                            ${keys[2]}: ${waterByWeek[keys[2]]} oz.<br>
                            ${keys[1]}: ${waterByWeek[keys[1]]} oz.<br>
                            ${keys[0]}: ${waterByWeek[keys[0]]} oz.<br>`;
};
