# Splitify

## Description

Wether you need to split your bill with friends the ‘dutch way’ or item by item, this applicaiton simplifies the proccess.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about. Before I can access it I will be
 redirected to the login page.
- **sign up** - As a user I want to sign up on the webpage so that I can create bills to split with my friends or recieve notifications that I
 have been added to a new bill.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **bills list** - As a user I want to see all the active bills i have created or have been added to
- **bills detail** - As a user I want to see the bills details.
- **bills create** - As a user I want to create a bill to split with my friends
- **bills update** - As a user I want to update a bill in case I was wrongly assigned something I did not consume.
- **add friends to network** - As a user I want to add friends to my application network in order to add them when I create a new bill

## Routes:

| Method | Route | Description|
|------|-------|------------|
| GET  | /     | Main page route. If logged in takes to create bill. If not redirects to login 
| GET  | /login | Login route. Renders login formulary view
| POST | /login | Login route. Sends login formulary info to the server
| GET | /signup | Signup route. Renders signup formulary view
| POST | /signup | Signup route. Sends signup info to server and creates user in DB
| GET | /profile/:userId | Profile route. Renders profile view
| GET | /findusers | Profile route. Sends add friends formaliry into DB
| GET | /bills/new | Bills route. renders new bill view. Must pass bill variable into next view.
| GET | /bills/new/edit | Bills route. Renders bill creation formulary view
| POST | /bills | Bills route. Sends bill creation formulary in the server and creates new bill in database
| GET | /bills/:userId | Bills route. Renders active bills list view.
| GET | /bills/:billId | Bills route. Renders the bill details view
| POST | /bills/:billId | Bills route. Delete bill from current bills list

## Models

User model

```javascript
{
  userId: String
  username: String
  email: String
  password: String
  timeStamp: Date
  myFriends: [UserID]
}

```

Bill model

```javascript
id: String
creatorId: UserID
participants: [UserID]
items: [items*]
```

* Items array internal structure
```javascript
items = {
  name: String
  price: String
  userId: String
}
```


## Backlog

User profile:

- Upload my profile picture
- See other users profile
- Past list of bills
- Show bill payer level

Main:

- Suggest users who are paying lots of whole bills as friends
- Desktop version

Bill splitting:

- More ways of splitting a bill (percentages, set someone as single payer)
- Gamify bill paying
- All users included in a bill are able to select their own individual items

Password:

- Password control
- Remember me

Geo Location:

- Add geolocation to bills when created
- Show it in the map when viewed in history

OCR:

- Take a picture of a bill
- Use OCR API to parse the text in the bill
- Receive the object and show the bill items on user screen

## Links

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](https://splitify.herokuapp.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)