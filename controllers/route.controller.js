exports.getRoutes = function (req, res) {
  var mock = [{
      'pk': 1,
      'departure': 'belatrix',
      'arrival': 'la molina',
      'sits': 3,
      'contact': {
        'id': 2,
        'password': '',
        'last_login': null,
        'is_superuser': false,
        'username': 'Bruce',
        'first_name': 'Wayne',
        'last_name': 'Wayne',
        'email': 'bruce@email.com',
        'is_staff': false,
        'is_active': true,
        'date_joined': '2016-07-01T10:52:02.253971Z',
        'skype_id': 'bwayne_id',
        'cellphone': 98744444,
        'groups': [],
        'user_permissions': []
      }
    }];
  res.json(mock);
};

exports.getById = function (req, res) {
  var mock = {
    'pk': 1,
    'departure': 'belatrix',
    'arrival': 'la molina',
    'comments': 'javier prado',
    'sits': 3,
    'contact': 2,
    'passengers': [
      2
    ]
  };

  res.json(mock);
};

exports.getByPassengerId = function (req, res) {
  res.json({passenger_id: req.params.passenger_id});
};

exports.register = function (req, res) {
  res.json({'detail': ':)'});
};