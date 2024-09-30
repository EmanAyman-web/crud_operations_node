const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'views','index.html'));
});

app.post('/users', (req, res) => {
  const { name, dob, faculty, university, gpa, department } = req.body;
  
  const user = { id: Date.now().toString(), name, dob, faculty, university, gpa, department };  // Convert ID to string
  users.push(user);
  
  console.log('User added:', user);  
  console.log('Current users:', users);  
  
  res.json(users);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);  
  
  console.log('Fetch user:', id);  
  
  if (user) {
    res.json(user);  
  } else {
    res.status(404).send({ error: 'User not found' });  
  }
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, dob, faculty, university, gpa, department } = req.body;
  
  const userIndex = users.findIndex(user => user.id === id);  
  if (userIndex !== -1) {
    users[userIndex] = { id, name, dob, faculty, university, gpa, department };
    res.json(users);  
  } else {
    res.status(404).send({ error: 'User not found' });  
  }
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id !== id);  
  res.json(users);
});

app.listen(3003, () => console.log('Server running on http://localhost:3003'));
