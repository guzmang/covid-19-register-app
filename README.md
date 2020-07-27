## COVID-19 Register App (Version 1.0.0)

Welcome! This is an app to register the people's COVID-19 tests and give us back a result to know if they are: healthy, infected or immune.

Before, you need to have installed nodejs 12.18.2 (or superior) and mongo to persist information to database.

Please clone the repository and don't forget execute the next command line to download the dependencies into the project:

```
npm install
```

The next step is start the server, so run:

```
npm start
```

To up mongodb you must follow the guide that reads on site:

```
https://docs.mongodb.com/manual/administration/install-community/
```

Once the server is up, you can make a GET adn POST requests. The port setting for default is 3000.

## Listing persons (GET method)

Given the port, the url is:

```
http://localhost:3000/covid/checks
```

This request responds a message with the total number of persons get from the database.

## Listing persons by country and/or result (GET method)

But if you only want persons from a specific country or maybe just get the list of persons with a result, you can use this parameters in the url (one or both as long as these are valid values). Result just can be: healthy, infected or immune.
```
http://localhost:3000/covid/checks/search?country=Paraguay&result=healthy
```

## Listing persons by status (GET method)

Other posibility is getting persons by analysis result. This is the url:

```
http://localhost:3000/covid/stats
```

## Listing persons by id (GET method)

The last get method we have is obtaining person by id (if exists):

```
http://localhost:3000/covid/checks/5f02ac7a54007ac394f05b94
```

## Registering persons (POST method)

```
http://localhost:3000/covid/checks
```

Body is required (with all its properties) in JSON format, for example:

{
    "name": "Elizabeth",
    "country": "Chile",
    "dna": "AAAAGACGGTGCTTATGTAGAAGTCCCCTTTCACTT"
}

The dna property have some validations. It must be a:
- NxN sequence (N min value: 2), it means a string with length NxN.
- String that only contains A, T, C and G as values.

## User interface

Download it on github:

https://github.com/guzmang/covid-19-register-app-ui

## To end

We upload our app on Heroku to a fast test. Please visit:

https://covid-19-register.herokuapp.com/covid/checks

## Testing

Run in the directory project the command:

```
npm test
```

## POSTMAN

This is an online document that may help you to test the existing different endpoints.

https://documenter.getpostman.com/view/9195768/T1DqgcHL?version=latest
