# Search engine

## Prerequisites
The following technologies should be installed globally
* Node 
* Docker

This app perform searches over a star wars dataset. For example: empire

![Image of design](https://res.cloudinary.com/dtwqtpteb/image/upload/v1672606252/lb0ju5p10fuwsvulsshh.png)

By clicking on specifc title of movie you can see the related characters:


![Image of design](https://res.cloudinary.com/dtwqtpteb/image/upload/v1672606262/esivulol2sbu9f41fh28.png)

The default items in page stands on 10, but you can choose to see more items, and skip to other pages of characters.



## Running

This bash script will build the image of the project

```
sh run.sh
```


## Tests

Currently I test part of the api using mocha & chai. In order to run test, go to this path:

```
cd server
```
And run this command:

```
npm run test
```

