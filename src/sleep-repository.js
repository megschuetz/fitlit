import Sleep from './Sleep';

class SleepRepository {
  constructor(sleepData){
    this.dataObjects = sleepData;
  };
  getAllUserData(userId) {
    const foundData = this.dataObjects.filter(user => user.userID === userId);
      return foundData;
  };
  makeNewSleep(user, data) {
    return new Sleep(user, data);
  };
  calculateAvgHoursSlept() {
    const allUsersHoursSleptSum = this.dataObjects.reduce((totalHours, object) => {
      totalHours += object.hoursSlept
      return totalHours
    }, 0);
    let result = allUsersHoursSleptSum / this.dataObjects.length;
    parseInt(result.toFixed(1));
    return result;
  };
};


export default SleepRepository;
