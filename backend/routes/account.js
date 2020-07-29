// Used towards CRUD applications towards the API 

const router = require('express').Router();
let Accounts = require('../models/accounts.model');

// This code runs when our url is a ../users/ 
router.route('/').get((req, res) => {
    // .find() is a mongoose method in which will get a list of all the users from the MongoDB 
    // res.json() is a function which returns something in json format, in this case 'users'
    // we add a .catch in case of error and return a status 400 in json format 
    Accounts.find()
        .then(account => res.json(account))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This code runs when our url is a ../users/add and is a post request (adds stuff)
router.route('/add').post((req, res) => {
    // Gets the username which we want to add from the req (request) body
    const username = req.body.username;
    const password = req.body.password;
    const email = "palceholder@gmail.com"; 
    const tags =["placeholder1", "placeholder2"];
    // Creates a new instance of user with username
    const newAccount = new Accounts({username, password, email, tags});

    // Mongoose method .save() which adds our instance of user into the MongoDB  
    newAccount.save()
        .then(() => res.json('Account added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    console.log(req.params.username)
    Accounts.findOne({username: req.params.username})
    //Accounts.findById(req.params.id)
      .then(account => res.json(account))
      .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//     Accounts.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Account deleted'))
//         .catch(err => res.status(400).json('Error ' + err));
// });

router.route('/update/:id').post((req, res) => {
    Accounts.findById(req.params.id)
        .then(account => {
            account.password = req.body.password;

            account.save()
            .then(() => res.json('Account updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
