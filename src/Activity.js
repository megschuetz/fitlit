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

  // hitDailyStepGoal(userId, date) {
  //   let findUser = this.findUser(userId);
  //   let userProfileData = userData.find((user) => {
  //       return userProfileData.id === userId;
  //   });
  //   let stepsDay = findUser.find((user) => {
  //       return userProfileData.date === date;
  //   }).numSteps;
  //   if (userProfileData.dailyStepGoal <= stepsDay) {
  //     return true;
  //   } else { 
  //     return false;
  //   }
  // };

  milesPerDay(userId, date) {
    const findUser = this.findUser(userId);
    const numberSteps = findUser.find((user) => {
        return user.date === date;
    }).numSteps;
    const miles = numberSteps / 2000;
    return Math.round(miles * 100) / 100;
  };

  stairClimbRecord(userId) {
    const findUser = this.findUser(userId);
    const stairs = findUser
      .map((user) => {
        return user.flightsOfStairs;
      })
      .sort((a, b) => {
        return b - a;
      });
    return stairs.shift();
  };
}

export default Activity;
