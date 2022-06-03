import dayjs from 'dayjs'

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
    if (!unit) {
      return "Unit not found. Unable to load respective user data.";
    }
    const findUser = this.findUser(userId);
    const latestData = findUser[findUser.length - 1];
    return latestData[unit];
  };

  getWeeklyReportPerUnit(id, date, unit) {
    if (!date) {
      return "Date not found. Unable to load respective user data.";
    }
    const userData = this.findUser(id)
    const weekFromDate = [0,0,0,0,0,0,0].map((el, index) => {
      return dayjs(date).subtract([index], 'day').format('YYYY/MM/DD');
    });
    const entireWeek = weekFromDate.reduce((week, date) => {
      week[date] = 0;
      userData.filter(activityInfo => activityInfo.date === date)
      .forEach(el => {
        week[date] += el[unit];
      });
      return week;
    }, {})
    return entireWeek;
  };
  
  weeklyAverageMinsActive(userId, date) {
    const userData = this.findUser(userId);
    if (!date) {
      return "Date not found. Unable to load respective user data.";
    }
    const findUserByDate = userData.find(user => user.date === date);
    const indexOfDay = userData.indexOf(findUserByDate);
    const weekData = userData.slice(indexOfDay - 6);
    const weeklyAverageMinsActive = weekData.reduce((sum, data) => {
      sum += data.minutesActive
      return sum
    }, 0);
    return weeklyAverageMinsActive;
  };

  allUsersAverageUnits(unitMeasured) {
    const latestDate = this.activityData[this.activityData.length -1]
    const allUsersOnDate = this.activityData.filter((user) => user.date === latestDate.date);
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
    if (!date) {
      return "Date not found. Unable to load respective user data.";
    }
    const numberSteps = findUser.find((user) => {
    return user.date === date;
    });
    let miles = numberSteps.numSteps / 2000;
    return Math.round(miles * 100) / 100;
  };

  stairClimbRecord(userId) {
    if (!userId) {
      return "User Id not found. Unable to load respective user data.";
    }
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
