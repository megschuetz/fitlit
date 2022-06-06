// Your fetch requests will live here!
const usersApi = "http://localhost:3001/api/v1/users"
const activeApi = "http://localhost:3001/api/v1/activity"
const sleepApi = "http://localhost:3001/api/v1/sleep"
const hydrationApi = "http://localhost:3001/api/v1/hydration"

const fetchData = (url) => {
    return fetch(url).then(response => response.json())
}

const userProfileData = fetchData(usersApi);
const userActivityData = fetchData(activeApi);
const userSleepData = fetchData(sleepApi);
const userHydrationData = fetchData(hydrationApi);

const addData = (postObject) => {
<<<<<<< HEAD
    return fetch("http://localhost:3001/api/v1/sleep", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postObject)
    })
  }

  addActivityData(postActiveObject).then(response => response.json())
  .then(object => {
    fetchData("http://localhost:3001/api/v1/activity").then(data => {
    activityDataHelper(data.activityData)
    })
  })
  activityForm.reset();
=======
  return fetch("http://localhost:3001/api/v1/sleep", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postObject)
  }).then(response => response.json());
>>>>>>> 129b9b666268839db4f5c179bc6a0352f73bfc7b
}
  

const addHydrationData = (postHydrationObject) => {
  return fetch("http://localhost:3001/api/v1/hydration", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postHydrationObject)
  }).then(response => response.json());
}

<<<<<<< HEAD
export {userProfileData, userActivityData, userSleepData, userHydrationData, addData, addActivityData}
=======
const addActivityData = (postActivityObject) => {
  return fetch("http://localhost:3001/api/v1/activity", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postActivityObject)
  }).then(response => response.json());
}

export {userProfileData, userActivityData, userSleepData, userHydrationData, addData, addHydrationData, addActivityData, fetchData}
>>>>>>> 129b9b666268839db4f5c179bc6a0352f73bfc7b
