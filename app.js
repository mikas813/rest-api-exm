const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const {v4} = require('uuid');

let CONTACTS = [{id: v4(), name: 'Myk', value: '321132123', marked: false}];

app.use(express.json());

app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.json(CONTACTS)
  }, 1000);
});

app.get('/api/contacts/:name', (req, res) => {
  const contact = (CONTACTS.filter(c => c.name === req.params.name));
  res.json(contact)
});

app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false};
  CONTACTS.push(contact);
  res.status(201).json(contact)
});

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
  res.json({message: 'Contact deleted'})
});

app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));