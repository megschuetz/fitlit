


class Sleep {
  constructor(userId, allUserInstances){
    this.userId = userId;
    this.allUserInstances = allUserInstances;
    this.avgSleepQuality = this.calculateAvgDailySleepQuality();
  };
  calculateAvgDailySleepQuality() {
    let overallSleepQualitySum = this.allUserInstances.reduce((totalAcc, instance) => {
    totalAcc += instance.hoursSlept;
    return totalAcc;
  }, 0)
    let result = overallSleepQualitySum / this.allUserInstances.length;
    return result;
  };
  findObjectByDate(day) {
    let specifiedObject = this.allUserInstances.find(userObject => userObject.date === day);
    return specifiedObject;
  }
  // returnHoursSlept(day) {
  //   let specifiedObject = this.findObjectByDate(day);
  //   return specifiedObject.hoursSlept;
  // }
  // returnSleepQuality(day) {
  //   let specifiedObject = this.findObjectByDate(day);
  //   return specifiedObject.sleepQuality;
  // }
  returnObjectByDate(day, objectType) {
    let specifiedObject = this.findObjectByDate(day);
    return specifiedObject[objectType];
  }
//   calculateSevenDayAvg(startDate) {
// let startingObject = this.findObjectByDate(startDate);
// let index = this.allUserInstances.indexOf(startingObject);
// let objectsWithinDateRange = this.allUserInstances.slice(this.allUserInstances[index], 7);
// let totalHoursSlept = objectsWithinDateRange.reduce((acc, object) => {
//   acc += object.hoursSlept
//   return acc
// },0);
// let result = totalHoursSlept / objectsWithinDateRange.length
// result = (Math.round(result * 10) / 10)
// return result
//   }
  calculateAvg(startDate, type) {
    let startingObject = this.findObjectByDate(startDate);
    let index = this.allUserInstances.indexOf(startingObject);
    let objectsWithinDateRange = this.allUserInstances.slice(this.allUserInstances[index], 7);
    let total = objectsWithinDateRange.reduce((acc, object) => {
      acc += object[type];
      return acc;
    },0);
    let result = total / objectsWithinDateRange.length;
    result = (Math.round(result * 10) / 10);
    return result;
    };
  };

export default Sleep;
