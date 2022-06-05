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
  }).then(response => response.json());
}

const addHydrationData = (postHydrationObject) => {
  return fetch("http://localhost:3001/api/v1/hydration", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postHydrationObject)
  }).then(response => response.json());
}

export {userProfileData, userActivityData, userSleepData, userHydrationData, addData, addHydrationData, fetchData}
