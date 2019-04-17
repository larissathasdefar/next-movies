# Next Movies

This is an React.js website that uses the [TMDB API](https://developers.themoviedb.org/3).

This app retrive the upcoming movies list, details about a specific movie and search movies by name.

You can try out this here: https://larissathasdefar.github.io/next-movies.

## Install

```yarn```

## Run
```yarn start```

## Libs

* @material-ui (core and icons): Used for UI components;
* date-fns: Used to format date;
* ramda: Used for Functional Programming, and utility, removing the need of Immutable.js;
* redux: Used for store management;
* styled-components: Used for customize React components.

## Architecture

* /actions: Redux actions that will call the api;
* /assets: Images used on the project;
* /constants: Constants for the redux lifecycle;
* /components: Big customized components;
* /containers: React files responsible for integrate redux, actions and React components;
* /reducers: Reducers that transform the redux store.
