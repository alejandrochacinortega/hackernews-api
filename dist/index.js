'use strict';

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());

app.set('port', process.env.PORT || 5000);

app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.get('/users', function (req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([{ id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com' }, {
    id: 2,
    firstName: 'Tammy',
    lastName: 'Norton',
    email: 'tnorton@yahoo.com'
  }, {
    id: 3,
    firstName: 'Tina',
    lastName: 'Lee',
    email: 'lee.tina@hotmail.com'
  }]);
});

app.get('/hackernew', function (req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  (0, _nodeFetch2.default)('https://hacker-news.firebaseio.com///v0/newstories.json?print=pretty').then(function (response) {
    return response.json();
  }).then(function (data) {
    return res.json(data);
  });
});

app.get('/hackernewslatest', function (req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  _axios2.default.get('https://hacker-news.firebaseio.com///v0/newstories.json?print=pretty').then(function (response) {
    var promises = [];
    _immutable2.default.fromJS(response.data).take(2).map(function (news) {
      promises.push(_axios2.default.get('https://hacker-news.firebaseio.com/v0/item/' + news + '.json?print=pretty'));
    });

    return _axios2.default.all(promises).then(function (results) {
      return console.log('RESULT ', res.json(_lodash2.default.map(results, 'data')));
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'));
});
//# sourceMappingURL=index.js.map