import { expect } from 'chai';
import SleepRepository from '../src/sleep-repository';
import Sleep from '../src/Sleep';

describe('Sleep', () => {

let sleepData;
let sleepRepo;
let sleep;

beforeEach( () => {
  sleepData = [
    {
      "userID":1,
      "date":"2019/06/15",
      "hoursSlept":6.1,
      "sleepQuality":2.2
    },
    {
      "userID":2,
      "date":"2019/06/15",
      "hoursSlept":7,
      "sleepQuality":4.7
    },
    {
      "userID":3,
      "date":"2019/06/15",
      "hoursSlept":10.8,
      "sleepQuality":4.7
    },
    {
      "userID":1,
      "date":"2019/06/16",
      "hoursSlept":4.1,
      "sleepQuality":3.8
    },
    {
      "userID":2,
      "date":"2019/06/16",
      "hoursSlept":7.5,
      "sleepQuality":3.8
    },
    {
      "userID":3,
    "date":"2019/06/16",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/17",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/18",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/19",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/20",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/21",
    "hoursSlept":10.7,
    "sleepQuality":3.4
    },
    {
      "userID":3,
    "date":"2019/06/22",
    "hoursSlept":15,
    "sleepQuality":3.4
    },
  ];

    sleepRepo = new SleepRepository(sleepData);
    sleep = new Sleep(1, sleepRepo.getAllUserData(1));

  });
  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should have an ID', () => {
    expect(sleep.userId).to.equal(1);
  });

  it('should hold all user occurrences', () => {
    expect(sleep.allUserInstances).to.deep.equal([
      { "userID": 1, "date": '2019/06/15', "hoursSlept": 6.1, "sleepQuality": 2.2 },
      { "userID": 1, "date": '2019/06/16', "hoursSlept": 4.1, "sleepQuality": 3.8 }
    ]);
  });

  it('should hold the most recent sleep data object', () => {
    expect(sleep.latest).to.deep.equal({ userID: 1, date: '2019/06/16', hoursSlept: 4.1, sleepQuality: 3.8 });
  });

  it('should hold user avg sleep quality', () => {
    expect(sleep.avgSleepQuality).to.equal(3);
  });

  it('should hold user avg hours slept', () => {
    expect(sleep.avgHoursSlept).to.equal(5.1);
  });

  it('should return a rounded average of two numbers', () => {
    expect(sleep.findAvg(10, 2)).to.equal(5);
    expect(sleep.findAvg()).to.equal("Error");
  });

  it('should find any data object by date', () => {
    expect(sleep.findUserDataObjectByDate("2019/06/15")).to.deep.equal(sleep.allUserInstances[0]);
    expect(sleep.findUserDataObjectByDate("2019/06/16")).to.deep.equal(sleep.allUserInstances[1]);
    expect(sleep.findUserDataObjectByDate("2015/06/16")).to.equal("Error");

  });

  it('should return any object', () => {
    expect(sleep.returnObjectByDate("2019/06/15", "hoursSlept")).to.equal(6.1);
    expect(sleep.returnObjectByDate("2019/06/16", "sleepQuality")).to.equal(3.8);
    expect(sleep.returnObjectByDate("2019/06/16")).to.equal("Error");
    expect(sleep.returnObjectByDate("2000/06/16")).to.equal("Error");
    expect(sleep.returnObjectByDate("2000/06/16", "sleepQuality")).to.equal("Error");
    expect(sleep.returnObjectByDate("sleepQuality")).to.equal("Error");
    expect(sleep.returnObjectByDate("hoursSlept")).to.equal("Error");
    expect(sleep.returnObjectByDate()).to.equal("Error");
  });

  it('should return the average of anything specified within a week(sleep quality, hours slept)', () => {
    let user3 = new Sleep(3, sleepRepo.getAllUserData(3))
    expect(user3.calculateWeeklyAvg("2019/06/15", "sleepQuality")).to.equal(3.4);
    expect(user3.calculateWeeklyAvg("2019/06/15", "hoursSlept")).to.equal(11.4);
    expect(user3.calculateWeeklyAvg("2019/06/15")).to.equal("Error");
    expect(user3.calculateWeeklyAvg("hoursSlept")).to.equal("Error");
    expect(user3.calculateWeeklyAvg()).to.equal("Error");
  });

  it('should find overall avg', () => {
    expect(sleep.calculateOverallAvg("hoursSlept")).to.equal(5.1);
    expect(sleep.calculateOverallAvg("sleepQuality")).to.equal(3);
    expect(sleep.calculateOverallAvg()).to.equal("Error");
  });
});
