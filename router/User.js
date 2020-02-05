const User = require('../models/users')

class UserDetail {
    findUser (req, res) {
    let query = User.find({}).select('email name age address image')

        query.exec(function (err, users) {
            if (err) return console.error(err);
            let userDetails = users
            res.status(200).json(userDetails)
          })
    }
    
     updateUsers (req, res) {
      let usersId = req.params.id
      // if(mongoose.Types.ObjectId.isValid(eventsId)) {
        User.findOneAndUpdate({_id: usersId},
          {
            $set:{
            name:req.body.name,
            email: req.body.email,
              age: req.body.age,
              date_of_birth: req.body.date_of_birth,
              bloodGroup: req.body.bloodGroup,
               password: req.body.password,
               phoneNumber: req.body.phoneNumber,
               image: req.body.image,
               group: req.body.group,
               token: req.body.token,
            }
        },{new:true})
           .then((events)=>{
           if(events) {
              res.status(200).json({success:true, data:events});
           }
       }).catch((err)=>{
          console.log(err)
       })
      //  } else {
      //     reject({success:"false",data:"provide correct key"});
      //  }
     }
    findOneUser (req, res) {
        let userId = req.params.id
        User.findById(userId)
        .then((user)=> {
          res.status(200).json(user)
        })
        .catch((err)=> {
          console.log(err)
        })
         
      }
      addUser (req, res, next) {
        console.log(req.body.file)
             var userData = {
             email: req.body.email,
             password: req.body.password,
             name: req.body.name,
             age: req.body.age,
             address: req.body.address,
             phoneNumber: req.body.phoneNumber,
             bloodGroup: req.body.bloodGroup,
             group: req.body.group,
             image: req.body.image,
             
           }
           User.create(userData, function (err, user) {
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


module.exports = UserDetail;