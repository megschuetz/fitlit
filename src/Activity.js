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

  activeMinutesDay(userId, date) {
    let findUser = this.findUser(userId);
    let minsActivity = findUser.find((user) => {
      return user.date === date;
    }).minutesActive;
    return minsActivity;
  };

  activityStepsForWeek(userId) {
    const userData = this.findUser(userId);
    const lastElement = userData.indexOf(userData[userData.length - 1]);
    const weekData = userData.slice(lastElement - 6);
      return weekData.map((data) => 
        data.numSteps);
  };

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

  milesPerDay(userId, date) {
    let findUser = this.findUser(userId);
    let numberSteps = findUser.find((user) => {
        return user.date === date;
    }).numSteps;
    let miles = numberSteps / 2000;
    return Math.round(miles * 100) / 100;
  };

  stairClimbRecord(userId) {
    let findUser = this.findUser(userId);
    let stairs = findUser
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
