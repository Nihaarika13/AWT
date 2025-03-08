const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const schema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', schema);

const newUser = new User({
    name: 'John',
    age: 30,
    email: 'johndoe@example.com'
});

newUser.save()
    .then(user => console.log(user))
    .catch(err => console.log(err));

app.post('/post', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => res.status(201).json({ "message": "User added successfully!", "user": req.body }))
        .catch(err => res.status(400).json("unable to add user: " + err)); 
});

app.get('/get', (req, res) => {
    User.find()
        .then(users => {
            if (users && users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ "message": "User data is empty" });
            }
        })
        .catch(err => res.status(500).json("Error, can't retrieve: " + err));
});
app.get('/get/:name', (req, res) => {
    User.findOne({ name: req.params.name })
       .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ "message": "User not found" });
            }
        })
       .catch(err => res.status(500).json("Error, can't retrieve: " + err));
});
app.delete('/delete/:name', (req, res) => {
    User.findOneAndDelete({ name: req.params.name })
       .then(() => res.status(200).json({ "message": "User deleted successfully" }))
       .catch(err => res.status(500).json("Error, can't delete: " + err));
});
app.put('/put/:name', (req, res) => {
    
    User.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
       .then(user => {
        if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ "message": "User not found" });
            }
        })

        .catch(err => res.status(500).json("Error, can't update: " + err));
        
       })
app.listen(3000, () => console.log('Server started on port 3000...'));
