const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
const User = require('./models/users')
const mongoose = require('mongoose');
const multer = require('multer')
const UserDetail = require('./router/User')
const EventsDetail = require('./router/Events')
const BankDetail = require('./router/BankDetail')
const UserLog = require('./router/UserLog')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
let middleware = require('./middleware');


class HandlerGenerator {
  login (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    if (email && password) {
       User.find(function (err, users) {
        if (err) return console.error(err);
        let userDetails = users
        const passwords = userDetails.map(el => el.password)
        const usernames = userDetails.map(el => el.email)
        if (usernames.includes(email) && passwords.includes(password)) {
            let token = jwt.sign({email: email},
               config.secret,
              { expiresIn: '24h'
              }
            );
            let userEmail = email
            User.find({ email: userEmail })
            .then((user)=> {
              res.json({
                success: 'Good',
                message: 'Authentication successful!',
                token: token,
                userId: user[0].id
              });
            })
            .catch((err)=> {
              console.log(err)
            })
          } else {
            res.json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
      })
    } else {
      res.json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}


function main () {
  let app = express(); 

  
   const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
   let upload = multer({
     dest: './uploads/'
   })
  mongoose.connect('mongodb://127.0.0.1:27017/bloodbank', {useNewUrlParser: true});
  var db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
    console.log('Connected.')
});
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 9000;
  app.use(bodyParser.urlencoded({ 
    limit: '150mb',
    extended: true
  }));
  let userdetail = new UserDetail();
  app.use(express.static('public'));
  app.use(bodyParser.json({limit: '50mb'}));
  // Users 
  app.post('/login', handlers.login);
  app.get('/', handlers.index);
  app.get('/users', userdetail.findUser);
  app.get('/user/:id', userdetail.findOneUser);
  app.put('/user/:id', userdetail.updateUsers);
  app.post('/register', userdetail.addUser);
  // events 
  let eventDetail = new EventsDetail()
  app.get('/events', eventDetail.findEvents);
  app.post('/events', eventDetail.addEvents);
  app.put('/events/:id', eventDetail.updateEvents);
  app.get('/events/:userId', eventDetail.usersEvents);
  app.delete('/events/:id', eventDetail.deleteEvents)
  // blood Banks
  let bankdetails = new BankDetail();
  app.get('/bloodbank', middleware.checkToken, bankdetails.findBank);
  app.post('/bloodbank', bankdetails.addBankInfo);
  app.put('/bloodbank/:id', bankdetails.updateBanks);
  app.delete('/bloodbank/:id', bankdetails.deleteBank);

  // users log
  let userlogs = new UserLog();
  app.get('/user-logs', userlogs.findUserLog);
  app.post('/user-logs', userlogs.addMessage);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();

