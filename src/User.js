class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  getUserFirstName() {
    let firstName = this.name.split(' ')
    return firstName[0]
  }
  getUserLastName() {
    let lastName = this.name.split(' ')
    return lastName[1]
  }
}

export default User;
