var express = require('express');
var router = express.Router();

// Base path is /api/passenger

router.get('/list', function(req, res) {
  var mock = [
    {
      'pk': 1,
      'username': 'Alex',
      'first_name': 'Rodriguez',
      'last_name': 'Rodriguez'
    },
    {
      'pk': 2,
      'username': 'Bruce',
      'first_name': 'Wayne',
      'last_name': 'Wayne'
    }
  ];

  res.json(mock);
});

router.get('/:id', function(req, res) {
  var mock = {
    'pk': req.params.id,
    'username': 'Alex',
    'first_name': 'Rodriguez',
    'last_name': 'Rodriguez',
    'email': 'alex@email.com',
    'skype_id': 'alex_id',
    'cellphone': 987654321
  };

  res.json(mock);
});

router.post('/register', function(req, res) {
  var mock = {
    'detail': 'Successful passenger added'
  };

  res.json(mock);
});

module.exports = router;