// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

server.use(express.json())
const dataModel = require('./users/model')

server.get('/api/users', (req, res) => {
    dataModel.find().then(users => {
        if(users) return res.send(users)
    }).catch(err => res.status(505).json({ message: "The users information could not be retrieved" }))
});

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) return res.status(400).json({message: "Please provide name and bio for the user"})
    dataModel.insert(req.body).then(users => {
        res.status(201).send(users);
    }).catch(err => res.status(500).json({ message: "There was an error while saving the user to the database" }))
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    dataModel.findById(id).then(user => {
        if(!user) return res.status(404).json({ message: "The user with the specified ID does not exist" })
        res.json(user)
    }).catch(err => res.status(500).json({ message: "The user information could not be retrieved" }))
})

server.delete('/api/users/:id', (req, res) => {
    dataModel.remove(req.params.id).then(rmUser => {
        if(!rmUser) return res.status(404).json({ message: "The user with the specified ID does not exist" })
        res.status(200).json(rmUser)
    }).catch(err => res.status(500).json({ message: "The user could not be removed" }))
})

server.put('/api/users/:id', (req, res) => {
    if(!req.body.name || !req.body.bio) return res.status(400).json({ message: "Please provide name and bio for the user" })
    dataModel.update(req.params.id, req.body).then(updated => {
        if(!updated) return res.status(404).json({ message: "The user with the specified ID does not exist" })
        res.json(updated)
    }).catch(err => res.status(500).json({ message: "The user information could not be modified" }))
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
