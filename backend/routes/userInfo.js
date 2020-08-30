// Used towards CRUD applications towards the API 

const router = require('express').Router();
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 

let UserInfo = require('../models/userInfo.model');

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
});

var upload = multer({ storage: storage }); 

// This code runs when our url is a ../users/ 
router.route('/').get((req, res) => {
    // .find() is a mongoose method in which will get a list of all the users from the MongoDB 
    // res.json() is a function which returns something in json format, in this case 'users'
    // we add a .catch in case of error and return a status 400 in json format 
    UserInfo.find()
        .then(account => res.json(account))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This code runs when our url is a ../users/add and is a post request (adds stuff)
router.route('/add').post(upload.single('img'), (req, res) => {
    // Gets the username which we want to add from the req (request) body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email; 
    const tagsAssociated = req.body.usertags;
    const tagsDesired = req.body.desiredtags;
    const interests = req.body.interests;
    const summary = req.body.summary;

    const img = {
        data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
        contentType: 'image/png'
    }
    // Creates a new instance of user with username
    const newUserInfo = new UserInfo({username, password, email, tagsAssociated, tagsDesired, interests, img, summary});

    // Mongoose method .save() which adds our instance of user into the MongoDB  
    newUserInfo.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    console.log(req.params.username)
    UserInfo.findOne({username: req.params.username})
    //UserInfo.findById(req.params.id)
      .then(account => res.json(account))
      .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//     UserInfo.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Account deleted'))
//         .catch(err => res.status(400).json('Error ' + err));
// });

router.route('/update/:id').post((req, res) => {
    UserInfo.findById(req.params.id)
        .then(account => {
            account.password = req.body.password;

            account.save()
            .then(() => res.json('Account updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;
