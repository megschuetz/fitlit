import dayjs from 'dayjs'

class HydrationRepository {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  handleIdInputErrors(id) {
    if (!id) {
      return "User is not found. Unable to load respective user data.";
    }
  }

  getUserById(id) {
    const foundData = this.hydrationData.filter(data => data.userID === id);
    const isValid = id ? foundData : this.handleIdInputErrors(id)
    return isValid;
  }

  getAvgFluidOuncesById(id) {
    const allHydrationDataById = this.getUserById(id);
    if (typeof allHydrationDataById === 'string') {
      return allHydrationDataById;
    }
    const totalFluidOunces = allHydrationDataById.reduce((totalOunces, hydrationInfo) => {
      totalOunces += hydrationInfo.numOunces;
      return totalOunces;
    }, 0)
    return Math.round(totalFluidOunces / allHydrationDataById.length);
  }

  getFluidOuncesByDate(id, date) {
    const allHydrationDataById = this.getUserById(id);
    if (typeof allHydrationDataById === 'string') {
      return allHydrationDataById;
    }
    if (!date) {
      return "Date not found. Unable to load respective user data.";
    }
    const hydrationByDate = allHydrationDataById
      .filter(hydrationInfo => hydrationInfo.date === date)
      .reduce((totalOunces, hydrationInfo) => {
        totalOunces += hydrationInfo.numOunces;
        return totalOunces;
      }, 0)
      return Math.round(hydrationByDate);
  }

  getFluidOuncesEachDayOfWeek(id, date) {
    const allHydrationDataById = this.getUserById(id);
    if (typeof allHydrationDataById === 'string') {
      return allHydrationDataById;
    }
    const weekFromDate = [0,0,0,0,0,0,0].map((el, index) => {
      return dayjs(date).subtract([index], 'day').format('YYYY/MM/DD');
    });
    const hydroWeek = weekFromDate.reduce((week, date) => {
      week[date] = 0;
      allHydrationDataById.filter(hydrationInfo => hydrationInfo.date === date)
      .forEach(el => {
        week[date] += el.numOunces;
      });
      return week;
    }, {})
    return hydroWeek;
  }
}


export default HydrationRepository;
