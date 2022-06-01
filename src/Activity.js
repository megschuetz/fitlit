class Activity {
  constructor(activityInfo) {
    this.activityData = activityInfo;
  };

  findUser(userId) {
    if (!this.activityData.map((data) => data.userID).includes(userId)) {
      return "User does not exist";
    }
    return this.activityData.filter((id) => id.userID === userId);
  };

  getLatestUnit(userId, unit) {
    const findUser = this.findUser(userId);
    const latestData = findUser[findUser.length - 1];
    return latestData[unit];
  };

  getWeeklyReportPerUnit(userId, unit) {
    const userData = this.findUser(userId);
    const lastElement = userData.indexOf(userData[userData.length - 1]);
    const weekData = userData.slice(lastElement - 6);
    return weekData.map((data) => data[unit]);
  };

  weeklyAverageMinsActive(userId, date) {
    const userData = this.findUser(userId);
    const findUserByDate = userData.find(user => user.date === date);
    const indexOfDay = userData.indexOf(findUserByDate);
    const weekData = userData.slice(indexOfDay - 6);
    const weeklyAverageMinsActive = weekData.reduce((sum, data) => {
      sum += data.minutesActive
      return sum
    }, 0);
    return weeklyAverageMinsActive;
  };

  allUsersAverageUnits(date, unitMeasured) {
    const allUsersOnDate = this.activityData.filter((user) => user.date === date);
    const total = allUsersOnDate.reduce((sum, user) => {
      sum += user[unitMeasured]
      return sum
    }, 0);
    return Math.round(total/allUsersOnDate.length);
  };

  checkDaysExceedingStepGoal(userId, userData){
    const findUser = this.findUser(userId);
    const daysExceedingGoal = findUser.filter((user) => user.numSteps >= userData.dailyStepGoal)
    return daysExceedingGoal.map(user => user.date)
  };

  milesPerDay(userId, date) {
    const findUser = this.findUser(userId);
    const numberSteps = findUser.find((user) => {
      return user.date === date;
    });
    let miles = numberSteps.numSteps / 2000;
    return Math.round(miles * 100) / 100;
  };

  stairClimbRecord(userId) {
    let findUser = this.findUser(userId);
    let stairs = findUser.map((user) => {
        return user.flightsOfStairs;
      }).sort((a, b) => {
        return b - a;
      });
    return stairs.shift();
  };

  findLatestDaySteps(userId) {
    const findUser = this.findUser(userId);
    const userData = findUser.map((data) => data.numSteps);
    return userData[userData.length - 1];
  };

}

export default Activity;
