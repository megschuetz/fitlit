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

const addActivityData = (postActivityObject) => {
    fetch("http://localhost:3001/api/v1/activity", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postActivityObject)
    })
    .then(response => response.json())
    .then(object => {
        console.log('newinfo', object)
    })
    // .catch((error) => {
    //     console.log(error);
    //       if (error.message === "Failed to fetch") {
    //         return (errorTag.innerText = "OOPS SORRY something went wrong");
    //       } else {
    //         return (errorTag.innerText = error.message);
    //       }
    // })

  }


export {userProfileData, userActivityData, userSleepData, userHydrationData, addActivityData}
