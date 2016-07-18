exports.getPassengers = function (req, res) {
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
};

exports.getById = function (req, res) {
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
};

exports.register = function (req, res) {
  var passenger = req.body;

  var mock = {
    'lol': passenger.name,
    'detail': 'Successful passenger added lol'
  };

  res.json(mock);
};