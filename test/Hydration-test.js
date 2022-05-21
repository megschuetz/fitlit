import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Hydration', () => {

let hydration1;
let hydration2;
let hydration3;

  beforeEach(() => {
    const hydrationData1 = {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      }
      const hydrationData2 = {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 75
      }
      const hydrationData3 = {
        "userID": 3,
        "date": "2019/06/15",
        "numOunces": 47
      };

    hydration1 = new Hydration(hydrationData1);

    hydration2 = new Hydration(hydrationData2);

    hydration3 = new Hydration(hydrationData3);

  });

  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration1).to.be.an.instanceOf(Hydration);
  });

  it('should have a userID property', () => {
    expect(hydration1.userID).to.equal(1);
  });

  it('should have a date property', () => {
    expect(hydration2.date).to.equal("2019/06/15");
  });

  it('should have a numOunces property', () => {
    expect(hydration3.numOunces).to.equal(47);
  });
});
