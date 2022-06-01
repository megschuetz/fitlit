import dayjs from 'dayjs'

class HydrationRepository {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getUserById(id) {
    if (!id) {
      return "User is not found"
    }
    const foundData = this.hydrationData.filter(data => data.userID === id);
      return foundData;
  }

  getAvgFluidOuncesById(id) {
    const allHydrationDataById = this.getUserById(id);
    const totalFluidOunces = allHydrationDataById.reduce((totalOunces, hydroObj) => {
      totalOunces += hydroObj.numOunces;
      return totalOunces;
    }, 0)
    return Math.round(totalFluidOunces / allHydrationDataById.length);
  }

  getFluidOuncesByDate(id, date) {
    const allHydrationDataById = this.getUserById(id);
    const hydrationByDate = allHydrationDataById
      .filter(hydroObj => hydroObj.date === date)
      .reduce((totalOunces, hydroObj) => {
        totalOunces += hydroObj.numOunces;
        return totalOunces;
      }, 0)
      return Math.round(hydrationByDate);
  }

  getFluidOuncesEachDayOfWeek(id, date) {
    const allHydrationDataById = this.getUserById(id);
    const weekFromDate = [0,0,0,0,0,0,0].map((el, index) => {
      return dayjs(date).subtract([index], 'day').format('YYYY/MM/DD');
    });
    const hydroWeek = weekFromDate.reduce((week, date) => {
      week[date] = 0;
      allHydrationDataById.filter(hydroObj => hydroObj.date === date)
      .forEach(el => {
        week[date] += el.numOunces;
      });
      return week;
    }, {})
    return hydroWeek;
  }
}


export default HydrationRepository;
