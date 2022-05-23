class Sleep {
  constructor(userId, allUserInstances){
    this.userId = userId;
    this.allUserInstances = allUserInstances;
    this.latest = this.returnLatest();
    this.avgSleepQuality = this.calculateAvgDailySleepQuality();
    this.avgHoursSlept = this.calculateAvgHoursSlept();
  };
  returnLatest() {
    let latestObject = this.allUserInstances.length -1;
    return this.allUserInstances[latestObject];
  }
  findAvg(dividend, divisor) {
    let quotient = dividend / divisor;
    quotient = (Math.round(quotient * 10) / 10);
    return quotient;
  }
  calculateAvgDailySleepQuality() {
    let overallSleepQualitySum = this.allUserInstances.reduce((totalAcc, instance) => {
    totalAcc += instance.sleepQuality;
    return totalAcc;
  }, 0);
    return this.findAvg(overallSleepQualitySum, this.allUserInstances.length);
  };
  calculateAvgHoursSlept() {
    let overallSleepQualitySum = this.allUserInstances.reduce((totalAcc, instance) => {
    totalAcc += instance.hoursSlept;
    return totalAcc;
  }, 0);
    return this.findAvg(overallSleepQualitySum, this.allUserInstances.length);
  };
  findUserDataObjectByDate(day) {
    let specifiedObject = this.allUserInstances.find(userObject => userObject.date === day);
    return specifiedObject;
  };
  returnObjectByDate(day, objectType) {
    let specifiedObject = this.findUserDataObjectByDate(day);
    return specifiedObject[objectType];
  };
  calculateWeeklyAvg(startDate, type) {
    let startingObject = this.findUserDataObjectByDate(startDate);
    let index = this.allUserInstances.indexOf(startingObject);
    let start = index-6
    let objectsWithinDateRange = this.allUserInstances.slice(start, this.allUserInstances.length);
    let total = objectsWithinDateRange.reduce((acc, object) => {
      acc += object[type];
      return acc;
    },0);
    return this.findAvg(total, objectsWithinDateRange.length);
  };
};

export default Sleep;
