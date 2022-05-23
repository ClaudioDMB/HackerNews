# HackerNewsWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

The goal is to build cleaner, easier more accessible version of [Hacker News](https://news.ycombinator.com/) using the resources from their [API](https://github.com/HackerNews/API).

## Description
The application allows users to view posts, filtering them by type.

## Solution approach
Looking at the Hacker News resources, I notice that an api to retrieve paginated posts entities wasn't availaible,
but was available an api to retrieve ids array of posts.

I preferred to use infinites scroll pagination,  to make the UI more user friendly.
Thanks to this pagination approach, users don't have to paginate themselves,but UI will handle it automatically.


Assuming that the pagination was in charge of front end, I decide to commission to the service all the pagination logic, in order
to make the components code readable and dry.
To do this I create 2 Behaviour subject (pages and postsType), that combined into a combineLatest, listen for changes and then retrieves datas.
Because of the infinite scroll feature, i have to made use of scan rxjs operator, that allows me to store previous results and then add the new ones.



[Features](#features)

- [Implemented](#implemented)

[Technologies used](#technologies-used)
- [Languages](#languages)
- [Libraries](#libraries)
- [Programs and tools](#programs-and-tools)

[Deployment](#deployment)

[Future improvements](#future-improvements)


## Features

### Implemented
- Infinite scroll pagination.
- Sorting by top, new and best stories.
- Responsive and more attractive design.
- Accesibility.

## Technologies Used
# Languages
- [SCSS](https://sass-lang.com/)
- [HTML5](https://www.w3schools.com/html/)
- [Typescript](https://www.html.it/guide/guida-typescript/)

# Libraries
- [NgxBootstrap](https://valor-software.com/ngx-bootstrap/) - Graphic library.

# Programs and tools
- [VSCode](https://code.visualstudio.com/) - used as IDE for the project.
- [Prettier](https://prettier.io/) - Code formatter.
- [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) - Development helper.
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) - Development helper.
- [Angular Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) - Development helper.
- [Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools) - Used to test and optimize the site.

## Deployment
To initialise the dependencies run
```
npm install
```
To start the application
```
run npm start
```

## Future improvements

As I wanted to keep the challenge in the 8 hours mark I had to left some functionalities out.

- In the future improvements I'd like to do a better error handling if there's any errors fetching the  from the API.
- Implements unit tests.
- Increase filters options (date, text filters). Looking for Hacker news search APIs, i found https://hn.algolia.com/api that could help for future development.
