import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import Immutable from 'immutable';
import axios from 'axios';
import _ from 'lodash';

const app = express();
app.use(cors());

app.set('port', process.env.PORT || 5000);

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    { id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com' },
    {
      id: 2,
      firstName: 'Tammy',
      lastName: 'Norton',
      email: 'tnorton@yahoo.com',
    },
    {
      id: 3,
      firstName: 'Tina',
      lastName: 'Lee',
      email: 'lee.tina@hotmail.com',
    },
  ]);
});

app.get('/hackernew', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  fetch('https://hacker-news.firebaseio.com///v0/newstories.json?print=pretty')
  .then(response => response.json())
  .then(data => res.json(data));
});

app.get('/hackernewslatest', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  axios
  .get('https://hacker-news.firebaseio.com///v0/newstories.json?print=pretty')
  .then(response => {
    const promises = [];
  Immutable.fromJS(response.data).take(2).map(news => {
    promises.push(
    axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`,
    ),
  );
});
  
  return axios.all(promises).then(results => console.log('RESULT ', res.json(_.map(results, 'data'))));
});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
