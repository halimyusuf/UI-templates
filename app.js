const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Joi = require('joi');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// default user
const users = [{
  id: 1,
  firstname: 'halim',
  lastname: 'Olamilekan',
  othernames: 'yusuf',
  email: 'haleemyoosuph@gmail.com',
  phoneNumber: '07035508581',
  username: 'halimyusuf',
  registered: Date(),
  isAdmin: true,
}];

// default post
const AllRedflag = [
  {
    id: 1,
    title: 'This is a title',
    story: 'This is the story of the title',
    createdOn: Date(),
    createdBy: 1,
    type: 'red-flag',
    location: '23.535 , 45.255',
    status: 'approved',
    images: ['Image', 'Image'],
    video: ['Image', 'Image'],
    comment: 'This is america!',
  },
];


// app.get("/")
// route to get all posts
app.get('/api/v1/red-flags', (req, res) => {
  res.send({ status: 200, data: [{ AllRedflag }] });
});

// route to get all specific user posts
app.get('/api/v1/:createdBy/red-flags', (req, res) => {
  const redflag = AllRedflag.filter(c => c.createdBy === parseInt(req.params.createdBy, 10));
  if (!redflag) return res.status(404).send({ status: 404, error: 'You have no post' });
  return res.send({ status: 200, data: [{ redflag }] });
});

// route to fetch all user infos
app.get('/api/v1/users', (req, res) => {
  res.send({ status: 200, data: [{ users }] });
});

// route to fetch a specific red-flag record
app.get('/api/v1/red-flags/:id', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });
  return res.send({ status: 200, data: [redflag] });
});

// route to create red-flag record, only users can create .
app.post('/api/v1/red-flags', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.body.createdBy, 10));
  if (!user) return res.status(404).send({ status: 404, error: 'Only users can post' });
  const schema = {
    title: Joi.string().min(3).required(),
    story: Joi.string().min(15).required(),
    location: Joi.string().min(3).required(),
    createdBy: Joi.number().integer().min(1).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send({ status: 400, error: result.error.details[0].message });
  }


  const RedFlag = {
    id: AllRedflag.length + 1,
    title: req.body.title,
    story: req.body.story,
    createdOn: Date(),
    createdBy: req.body.createdBy,
    type: 'red-flag',
    location: req.body.location,
    status: 'draft',
    images: ['Image', 'Image'],
    video: ['Image', 'Image'],
    comment: [],
  };
  AllRedflag.push(RedFlag);
  return res.send({ status: 200, data: [{ id: AllRedflag.lenth, message: 'Created red_flag post' }] });
});

// route to edit comment of a specific red-flag record
app.put('/api/v1/red-flags/:id/comment', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ status: 404, error: 'The course with the given id cant be found' });

  const schema = {
    comment: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  redflag.comment = req.body.comment;

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s comment' }] });
});


// route to edit comment of a specific red-flag record ,only the owner of post can edit the comment
app.put('/api/v1/red-flags/:id/comment/:userId', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ status: 404, error: 'The course with the given id cant be found' });
  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only edit their posts' });

  const schema = {
    comment: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  redflag.comment = req.body.comment;

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s comment' }] });
});


// route to edit location of a specific red-flag record
app.put('/api/v1/red-flags/:id/location', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });

  const schema = {
    location: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  redflag.location = req.body.location;

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s location' }] });
});


// route to edit location of a specific red-flag record ,only the owner of record can edit the location
app.put('/api/v1/red-flags/:id/location/:userId', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });
  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only edit their posts' });

  const schema = {
    location: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  redflag.location = req.body.location;

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s location' }] });
});


// delete a specific red-flag record
app.delete('/api/v1/red-flags/:id', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  if (!redflag) return res.status(404).send({ staus: 404, data: 'The course with the given id cant be found' });
  const index = AllRedflag.indexOf(redflag);
  AllRedflag.splice(index, 1);

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'red_flag record hass been deleted' }] });
});


// delete a specific red-flag record , only owner of post can delete record
app.delete('/api/v1/red-flags/:id/:userId', (req, res) => {
  const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only delete their posts' });
  if (!redflag) return res.status(404).send({ staus: 404, data: 'The course with the given id cant be found' });
  const index = AllRedflag.indexOf(redflag);
  AllRedflag.splice(index, 1);

  return res.send({ status: 200, data: [{ id: redflag.id, message: 'red_flag record hass been deleted' }] });
});


// route to create new user
app.post('/api/v1/create-user', (req, res) => {
  const schema = {
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    othernames: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phoneNumber: Joi.string().min(10).required(),
    username: Joi.string().min(3).required(),
    // isAdmin: Joi.boolean().invalid(false).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send({ status: 400, error: result.error.details[0].message });
  }


  const user = {
    id: users.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othernames: req.body.othernames,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
    registered: Date(),
    isAdmin: false,
  };
  users.push(user);
  return res.send({ status: 200, data: [{ id: users.lenth, message: 'Created user account' }] });
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`Listening on port ${port}...`); });

module.exports = server;
