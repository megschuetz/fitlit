import { expect } from "chai";
import Activity from "../src/Activity";
import UserRepository from "../src/UserRepository";
import activityData from "../src/data/activityData";
import userData from "../src/data/users"

describe("Activity", () => {
  let activity = new Activity(activityData);
  let userRepo = new UserRepository(userData)

  it('should be a instance of Activity', () => {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it("should be a function", function () {
    expect(Activity).to.be.a("function");
  });

  it("should return error message if user does not exist", function () {
    expect(activity.findUser(52)).to.equal("User does not exist");
  });

  it("should have a method that returns how many active minutes in a given day", function () {
    expect(activity.activeMinutesDay(1, "2019/06/15")).to.equal(140)
  });

  it("should have a method that lists number of flights for a week", function () {
    expect(activity.activityFlightsPast7Days(1)).to.deep.equal([
      36, 18, 33, 2,
      12,  6,  6
    ])
  });

});