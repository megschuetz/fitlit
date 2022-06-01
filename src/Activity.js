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

  activityStepsForWeek(userId) {
    const userData = this.findUser(userId);
    const lastElement = userData.indexOf(userData[userData.length - 1]);
    const weekData = userData.slice(lastElement - 6);
      return weekData.map((data) => 
        data.numSteps);
  };

  weeklyAverageMinsActive(userId, date) {
    const userData = this.findUser(userId);
    const findUserByDate = userData.find(user => user.date === date)
    const indexOfDay = userData.indexOf(findUserByDate);
    const weekData = userData.slice(indexOfDay - 6);
    const weeklyAverageMinsActive = weekData.reduce((sum, data) => {
      sum += data.minutesActive
      return sum
    }, 0);
    return weeklyAverageMinsActive
  }

  allUsersAverage(date, unitMeasured) {
    const allUsersOnDate = this.activityData.filter((user) => user.date === date)
    const total = allUsersOnDate.reduce((sum, user) => {
      sum += user[unitMeasured]
      return sum
    }, 0);
    return Math.round(total/allUsersOnDate.length)
  }

  activityFlightsPast7Days(userId) {
    const userFlightsData = this.findUser(userId);
    const lastElement = userFlightsData.indexOf(
      userFlightsData[userFlightsData.length - 1]
    );
    const weekData = userFlightsData.slice(lastElement - 6);
        return weekData.map((data) => data.flightsOfStairs);
  };

  hitDailyStepGoal(userId, date) {
    let findUser = this.findUser(userId);
    let userProfileData = userData.find((user) => {
        return userProfileData.id === userId;
    });
    let stepsDay = findUser.find((user) => {
        return userProfileData.date === date;
    }).numSteps;
    if (userProfileData.dailyStepGoal <= stepsDay) {
      return true;
    } else { 
      return false;
    }
  };
}

export default Activity;
