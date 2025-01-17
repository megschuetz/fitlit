class Sleep {
  constructor(userId, allUserInstances){
    this.userId = userId;
    this.allUserInstances = allUserInstances;
    this.latest = this.returnLatest();
    this.avgSleepQuality = this.calculateOverallAvg("sleepQuality");
    this.avgHoursSlept = this.calculateOverallAvg("hoursSlept");
  };
  returnLatest() {
    let latestObject = this.allUserInstances.length -1;
    return this.allUserInstances[latestObject];
  }
  findAvg(dividend, divisor) {
    if (!dividend || !divisor) {
      return "Error"
    } else {
    let quotient = dividend / divisor;
    quotient = (Math.round(quotient * 10) / 10);
    return quotient;
    }
  }
  calculateOverallAvg(type){
    if (!type) {
      return "Error"
    } else {
    let overallSum = this.allUserInstances.reduce((totalAcc, instance) => {
    totalAcc += instance[type];
    return totalAcc;
  }, 0);
    return this.findAvg(overallSum, this.allUserInstances.length);
    }
  };
  findUserDataObjectByDate(day) {
    let specifiedObject = this.allUserInstances.find(userObject => userObject.date === day);
    if (!specifiedObject) {
      return "Error"
    } else {
    return specifiedObject;
    }
  };
  returnObjectByDate(day, objectType) {
    let specifiedObject = this.findUserDataObjectByDate(day);
    if (!day || !objectType || !specifiedObject || !specifiedObject[objectType]){
      return "Error"
    } else {
    return specifiedObject[objectType];
    }
  };
  calculateWeeklyAvg(startDate, type) {
    let startingObject = this.findUserDataObjectByDate(startDate);
    let index = this.allUserInstances.indexOf(startingObject);
    let start = index-6
    let objectsWithinDateRange = this.allUserInstances.slice(start, this.allUserInstances.length);
    if (!startDate || !type || !startingObject || !objectsWithinDateRange){
      return "Error"
    } else {
    let total = objectsWithinDateRange.reduce((acc, object) => {
      acc += object[type];
      return acc;
    },0);
    return this.findAvg(total, objectsWithinDateRange.length);
    };
  }
};
export default Sleep;
