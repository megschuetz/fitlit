// Your fetch requests will live here!
const usersApi = "https:fitlit-api.herokuapp.com/api/v1/users"
const activeApi = "https://fitlit-api.herokuapp.com/api/v1/activity"
const sleepApi = "https://fitlit-api.herokuapp.com/api/v1/sleep"
const hydrationApi = "https://fitlit-api.herokuapp.com/api/v1/hydration"

const fetchData = (url) => {
    return fetch(url).then(response => response.json())
}

const userProfileData = fetchData(usersApi);
const userActivityData = fetchData(activeApi);
const userSleepData = fetchData(sleepApi);
const userHydrationData = fetchData(hydrationApi);


export {userProfileData, userActivityData, userSleepData, userHydrationData}
