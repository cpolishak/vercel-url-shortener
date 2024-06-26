# Url Shortener App

This project is a url shortener meant to clone behavior of Bitly. When the current active code is run (startup info below), it will load up a simple page built in React. You can enter in your long url in the textfield and click the button to generate a short link which can be clicked and will redirect you to the long url. 

There are currently a few options to run this because I started this as a back end only project to learn about how Bitly works. So read on to find out more if you like.

## Startup Instructions

At this time, you have to open 2 terminals (1 for back end and 1 for front) to run this app. Open one terminal in the 'api' directory and have a second terminal terminal open in the root directory. Run ```npm start``` in both terminals to start the servers. 

Currently, this is set up only to run locally. In the future I envision this will be connected to a mongoDB Atlas cluster for the db and it will be deployed on a heroku server so the links can persist (they will not work when you shut down your BE server).

### Simplest Implementation

The code with no database activated (when files and variables are commented out in back end files) will run the front and back end servers and allow the call to be made out from the front end to the back end to create the shortened code. 

In this implementation, the code could really be shortened to just the code rather than even having the localhost baseUrl. This is because I have grabbed both the longUrl and the shortUrl. 

### 2nd implementation - with DB

The code is already in the repo to connect to a mongoDB and run the front end locally to make this app work and persist while the BE server is active to handle redirects of a shortened url. 

To do this: 
    - Uncomment the imports and code pieces with notes about using with a DB in the Back end (under api directory) in the url.js, redirect.js, and the index.js files. 
    - On the front end, the App.js file has a line that can be uncommented in the Axios.post method to enable the response to 

### later implementation - deployed with cloud DB and live for use any time

In the future I plan to set up this application with a MongoDB Atlas Cluster and to Deploy the application via Heroku to have the BE and FE be largely always active. I plan to host it on Github Pages ideally but that could change down the road. I will also redo styling on things and link to the live app in my portfolio page. 

That way, I could actually send people to a site to play with the shortener and use it out to it's full capabilities. 