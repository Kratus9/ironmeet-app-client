# Project Name

## [See the App!](https://ironmeet.netlify.app)

![App Logo](![IronMeet Logo](<public/IronMeet logo-fotor-bg-remover-2023090792810.png>))

## Description

This project is an online dating application that allows users to meet up with new people, interact with other users, create events and join them. The application consists of a Node.js server with a RESTful API and a client that communicates with the server to provide an intuitive user interface.

#### [Client Repo here](https://github.com/Kratus9/ironmeet-app-client)
#### [Server Repo here](https://github.com/Kratus9/ironmeet-app-server)

## Backlog Functionalities

- Make the app responsive for all kind of devices.

## Technologies used

- HTML, CSS, Javascript, React, axios and React Context.

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Client Routes

## React Router Routes (React App)
| Path                      | Page            | Components           | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ---------------------| ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                      | public                   | Home page                                                     |
| `/signup`                 | Signup          |                      | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                      | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         | EditProfile          | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/events`                 | Events          | AddEvents, EventCard | user only `<IsPrivate>`  | Shows all films on backlog                                    |
| `/games/edit`             | GamesEdit       |                      | user only `<IsPrivate>`  | Shows all games on backlog                                    |
| `/games/favourites`       | FavouriteList   | GameCard             | user only `<IsPrivate>`  | Shows all games on backlog                                    |

## Other Components

- Navbar
- IsPrivate

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - game.filter(type, status)
  - game.detail(id)
  - game.add(id)
  - game.delete(id)
  - game.update(id)
  
- External API
  - gameApi.details
  - gameApi.list
  
## Context

- auth.context
  
## Links

### Collaborators

[Mark](https://github.com/Kratus9)

[Omar](https://github.com/Naol75)

### Project

[Repository Link Client](https://github.com/Kratus9/ironmeet-app-client)

[Repository Link Server](https://github.com/Kratus9/ironmeet-app-server)

[Deploy Link](https://ironmeet.netlify.app)

### Slides

[Slides Link](whttps://www.canva.com/design/DAFt2yGRrBM/RfiXknI8tpdjo8Djx9CzoA/edit?ui=eyJHIjp7fX0)