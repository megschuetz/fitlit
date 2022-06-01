import userData from "../src/data/users"

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

  dailyMinsActive(userId, date) {
    let findUser = this.findUser(userId);
    let minsActivity = findUser.find((user) => {
      return user.date === date;
    })
    return minsActivity.minutesActive;
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
  };

  allUsersAverageUnits(date, unitMeasured) {
    const allUsersOnDate = this.activityData.filter((user) => user.date === date)
    const total = allUsersOnDate.reduce((sum, user) => {
      sum += user[unitMeasured]
       return sum
    }, 0);
       return Math.round(total/allUsersOnDate.length)
  };

  activityFlightsPast7Days(userId) {
    const userFlightsData = this.findUser(userId);
    const lastElement = userFlightsData.indexOf(
      userFlightsData[userFlightsData.length - 1]
    );
    const weekData = userFlightsData.slice(lastElement - 6);
        return weekData.map((data) => data.flightsOfStairs);
  };

  // hitDailyStepGoal(userId, date) {
  //   let findUser = this.findUser(userId);
  //   let userProfileData = findUser.find((user) => {
  //       return userProfileData.id === userId;
  //   });
  //   let stepsDay = findUser.find((user) => {
  //       return userProfileData.date === date;
  //   })
  //   if (userProfileData.dailyStepGoal <= stepsDay.numSteps) {
  //     return true;
  //   } else { 
  //     return false;
  //   }
  // };
  
  allDaysStepGoal(userId) {
    let findUser = this.findUser(userId);
    let user = findUser.find((user) => {
        return user.id === userId
    });
    let week = findUser.reduce((a, b) => {
      if (b.numSteps >= user.dailyStepGoal) {
        a.push(b.date);
      }
      return a;
    }, []);
    return week;
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

  milesPerDay(userId, date) {
    let findUser = this.findUser(userId);
    let numberSteps = findUser.find((user) => {
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
