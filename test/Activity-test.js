import { expect } from "chai";
import Activity from "../src/Activity";
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("Activity", () => {
  let activityData;
  let activity;
  let users;

  beforeEach(() => {
     activityData = [
      {"userID":1,"date":"2019/06/15","numSteps":3577,"minutesActive":140,"flightsOfStairs":16},
      {"userID":2,"date":"2019/06/15","numSteps":3456,"minutesActive":60,"flightsOfStairs":17},
      {"userID":3,"date":"2019/06/15","numSteps":6879,"minutesActive":90,"flightsOfStairs":15},   
      {"userID":1,"date":"2019/06/16","numSteps":6637,"minutesActive":175,"flightsOfStairs":36},
      {"userID":1,"date":"2019/06/17","numSteps":14329,"minutesActive":168,"flightsOfStairs":18},
      {"userID":1,"date":"2019/06/18","numSteps":4419,"minutesActive":165,"flightsOfStairs":33},
      {"userID":1,"date":"2019/06/19","numSteps":8429,"minutesActive":275,"flightsOfStairs":2},
      {"userID":1,"date":"2019/06/20","numSteps":14478,"minutesActive":140,"flightsOfStairs":12},
      {"userID":1,"date":"2019/06/21","numSteps":6760,"minutesActive":135,"flightsOfStairs":6},
      {"userID":1,"date":"2019/06/22","numSteps":10289,"minutesActive":119,"flightsOfStairs":6},
    ]

    users = [{
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,

    }, 
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
    },
    {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
    }
  ]
    activity = new Activity(activityData);
  });

  it('should be a instance of Activity', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it('should be a function', () => {
    expect(Activity).to.be.a("function");
  });

  it('should return error message if user does not exist', () => {
    expect(activity.findUser(52)).to.equal("User does not exist");
  });

  it("should return a unit measured on a specific day", function () {
    expect(activity.getLatestUnit(1, 'minutesActive')).to.equal(119)
    expect(activity.getLatestUnit(1, 'flightsOfStairs')).to.equal(6)
  });

  it("should make a weekly report per unit for last 7 days", () => {
    expect(activity.getWeeklyReportPerUnit(1, 'numSteps')).to.deep.equal([6637, 14329, 4419,  8429, 14478,  6760, 10289])
    expect(activity.getWeeklyReportPerUnit(1, 'minutesActive')).to.deep.equal([175, 168, 165, 275, 140, 135, 119])
    expect(activity.getWeeklyReportPerUnit(1, 'flightsOfStairs')).to.deep.equal([ 36, 18, 33, 2, 12, 6, 6 ])
  });

  it('should calulate 7 day average for mins active based on date', () => {
    expect(activity.weeklyAverageMinsActive(1, '2019/06/22')).to.equal(1177)
  });
  
  it('should calculate the average of a given unit of all users on a given day', () => {
    expect(activity.allUsersAverageUnits("2019/06/15", "numSteps")).to.equal(4637)
    expect(activity.allUsersAverageUnits("2019/06/15", "minutesActive")).to.equal(97)
    expect(activity.allUsersAverageUnits("2019/06/15", "flightsOfStairs")).to.equal(16)
  });

  it("should check user steps to stepgoal", () => { 
    const getUser = users.find(user => user.id === 1)
    expect(activity.checkDaysExceedingStepGoal(1, getUser)).to.deep.equal(['2019/06/17', '2019/06/20', '2019/06/22'])
  });
  
  it("should have a method that returns miles walked in a specific day", () => {
    expect(activity.milesPerDay(1, "2019/06/15")).to.equal(1.79)
  });

  it("should have a method that finds step climbing record", () => {
    expect(activity.stairClimbRecord(1)).to.equal(36)
  });
});