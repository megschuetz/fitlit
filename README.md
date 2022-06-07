## Introduction
FitLit is a fitness dashboard displaying a single users health activity such as steps, flights, sleep and hydration. 
We used four API's to fetch the data, from a local server, and several classes to manipulate displaying the data via the DOM. Users can also input missing data via forms, that create Post requests to the local server. We pulled inspiration from relaxation apps and went for a desert theme when styling. 

## Preview

![Imgur](https://i.imgur.com/7BNgJZY.jpg)

## Reflections
Part 1:
With only a general spec sheet of what the site needed to do, one of the challenges of this project was the architecture. Beginning the class structure was diffuculty at first, but as we looked at the data and decided what we would display we gain direction. As a team we learned how impactful code reviews are in order to stay on track and understand eachothers code. Dealing with a larger data set for this project we also learned it will be benefical in the future to thoroughly look at the data first. 

Part 2:
During part 2, some of our struggles were displaying the weekly activity data and working with Post requests. We luckily had a similar example for displaying weekly hydration data that we used as a guide. Our biggest win was getting the Posts requests to successfully send data to the server and reload the display with the new data. Another win was making our site more accessible. 

## Technologies Used
- Javascript
- HTML
- CSS
- Webpack
- Mocha/Chai
- Agile

## Set UP
- In seperate directories, clone this repository and the repository linked [here](https://github.com/turingschool-examples/fitlit-api) to your local machine
- Using multiple tabs cd into each directories and run `npm install`
- Run `npm start`
- Copy and paste the URL given when starting this repository into your browser
- `Control + C` in your terminal when finished

## Contributors
- [Amelia Eiger](https://github.com/ameliaeiger)
- [Corinne Canavan](https://github.com/CorCanavan)
- [Megan Schuetz](https://github.com/megschuetz)
- [Kyle Howard](https://github.com/K-Howard)
