const UserLog = require('../models/UsersLog')

class userLog {
    findUserLog (req, res) {
        UserLog.find(function (err, message) {
            if (err) return console.error(err);
            let userlog = message
            res.status(200).json(userlog)
          })
    }
      addMessage (req, res, next) {
        console.log(req.body.file)
             var messageData = {
             name: req.body.name,
             email: req.body.email,
             image: req.body.image,
             message: req.body.message,
             rating: req.body.status
             
           }
           UserLog.create(messageData, function (err, user) {
             if (err) {
               console.log('You are erro')
               next(err)
               console.log(err)
             } else {
               return res.status(201).json(user);
             }
             next();
           });
         
   }
}


module.exports = userLog;