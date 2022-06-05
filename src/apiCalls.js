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
    return fetch("http://localhost:3001/api/v1/sleep", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postObject)
    })
  }
const addActivityData = (postActivityObject) => {
fetch("http://localhost:3001/api/v1/activity", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postActivityObject)
  })
}

export {userProfileData, userActivityData, userSleepData, userHydrationData, addData, fetchData, addActivityData}
