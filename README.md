# Places

## PlacesApi

This service is consists of two parts:

1. SignUp/Login :- This is to register a new user or to login an existing user. On a successful response, the API returns with an Authentication token that is required for any further actions.
2. Google Places Search Create/Get :- This is to save the place/s searched by a particular user or to fetch all the places that s/he has searched for. The request requires an authentication token (passed in headers). 

These API endpoints are integrated with Web component. 

How to get it working on your local environment:
 
You should have Node, npm, mongoDb installed on your system.

Once you clone the repo, inside /PlacesApi simply run-

npm install,
npm start

## PlacesWeb

This is the Interface that consumes the APIs provided by PlacesApi.

It is made up of two components :

1. SignUp/Login Page :- It has an option to register or to login. On a successful Login/Register, a session is created (handled using cookie) and user lands at Home page. The two possible further actions are either to search for a location or to logout (dismisses the authentication token cookie). 

2. Home Page :- There is a text bar which is integrated with google location api. In which if you start typing a location, suggestions will come.After searching and selecting a location , submitting it will save the search details like name, location, coordinates and other details of location In DB(using one of the endpoints). This page also displays the past search queries made by that particular user.

