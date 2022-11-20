# TravlR Web App

## Overview
This is a website that acts as both a social media platform and also as a personal vacation management diary.

## How it works
The website consists of 3 main pages:
- Home page
- Vacations page
- Specific Vacation page

#### Home page
![home](https://user-images.githubusercontent.com/43687545/202879993-f6ee688f-d74b-4b23-820b-36856e14da33.png)
The home page is where random pictures from users' vacations are displayed for everyone to see. This is to inspire and showcase places around the world.

*These pictures are only selected if the owner of the picture opts to make them public.*

If the user is not logged in, they can create an account using their email and a password, or log in to their existing account. The backend uses Json Web Tokens to keep the user logged in for 3 days. Once the user is logged in, the popup at the bottom of the page will go away.

#### Vacations page
![Screenshot from 2022-11-19 20-49-58](https://user-images.githubusercontent.com/43687545/202880377-3cf3cd68-f995-4eee-9657-68ed68b37d5a.png)
The vacations page is where the user can see an overview of their past or planned vacations. They can also add a vacation by clicking the blue add button. 

#### Specific vacation page
![spec](https://user-images.githubusercontent.com/43687545/202880605-2fb33729-bdbf-4e17-b924-1b652ee9e436.png)
Here the user can make a list of attractions they plan to visit and a todos list of things to take care of before they go on the vacation. Users can also add pictures from the vacation. If they choose to make a picture public then that picture could be randomly selected to show up on other user's home page.

## Technologies used
The backend uses Expressjs for the api, Mongoose for the database(Nodejs libraries) and the database is hosted on MongoDB Atlas. The backend is hosted on Heroku.

The frontend is React with Bootstrap and Material UI for react and is it hosted on Netlify.

## How to install
The website is http secure and can be accessed at https://quiet-cucurucho-9cb0b9.netlify.app
