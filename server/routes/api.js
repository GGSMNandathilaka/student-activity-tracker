const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fs = require('fs');
const dbFilePath = './data/users.json';

let obj = {
    users: []
};

router.get('/', (req, res) => {
    res.send('From API Route')
});

// User registration
router.post('/register', (req, res) => {
    let userData = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {

            let latestUserId = 0;
            if (data) {
                obj = JSON.parse(data); //now it an object
                console.log('file-read-data' + data);

                let users = obj.users;
                latestUserId = users.length;
            } else {
                obj = {};
                obj.users = [];
            }

            // append a user id
            userData._id = latestUserId;

            obj.users.push(userData); //add some data
            json = JSON.stringify(obj); //convert it back to json
            console.log('new-json-data' + json);

            fs.writeFile(dbFilePath, json, 'utf8', err => {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    let payload = {subject: userData._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
                //file written successfully
            });
        }
    });
});

// User Login
router.post('/login', (req, res) => {
    let userData = req.body;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {

            let userExists = false;
            let existingUser = null;
            if (data) {
                obj = JSON.parse(data); //now it an object
                console.log('file-read-data' + data);

                let users = obj.users;

                for (let user of users) {
                    if (user.email === userData.email) {
                        userExists = true;
                        existingUser = user;
                        break;
                    }
                }
            } else {
                obj = {};
                obj.users = [];
            }

            if (!userExists) {
                res.status(401).send('Invalid email');
            } else {
                if (existingUser.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = {subject: existingUser._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({
                        token
                    })
                }
            }
        }
    })
});

module.exports = router;