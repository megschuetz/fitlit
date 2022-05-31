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
    let user = userData.find((user) => {
        return user.id === userId;
    });

    let stepsDay = findUser.find((user) => {
        return user.date === date;
    }).numSteps;
    if (user.dailyStepGoal <= stepsDay) {
      return true;
    } else { 
      return false;
    }
  };
}

export default Activity;
